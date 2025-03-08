import {
  Alert,
  KeyboardAvoidingView,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useRef, useState } from "react";
import ScreenWrapper from "@/components/ScreenWrapper";
import Typo from "@/components/Typo";
import { colors, spacingX, spacingY } from "@/constants/theme";
import { verticalScale } from "@/utils/styling";
import BackButton from "@/components/BackButton";
import Input from "@/components/input";
import * as Icons from "phosphor-react-native";
import Button from "@/components/Button";
import { useRouter } from "expo-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/config/firebase";
const Login = () => {
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = async () => {
    if (!emailRef.current || !passwordRef.current) {
      Alert.alert("Please fill all fields");
      return;
    }

    setIsLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        emailRef.current,
        passwordRef.current
      );

      console.log("User logged in:", userCredential.user.uid);

      // Navigate to main app after successful login
      router.replace("/HomeScreen/BottomTab"); // Update this path based on your app structure
    } catch (error) {
      console.error("Login error:", error);

      // Display user-friendly error message
      let errorMessage = "Failed to login. Please try again.";

      if (error === "auth/user-not-found") {
        errorMessage = "No account exists with this email.";
      } else if (error === "auth/wrong-password") {
        errorMessage = "Invalid password.";
      } else if (error === "auth/invalid-email") {
        errorMessage = "Invalid email address.";
      } else if (error === "auth/invalid-credential") {
        errorMessage = "Invalid email or password.";
      } else if (error === "auth/api-key-not-valid") {
        errorMessage =
          "Application error: Invalid API key. Please contact support.";
      } else if (error === "auth/network-request-failed") {
        errorMessage = "Network error. Please check your internet connection.";
      }

      Alert.alert("Login Failed", errorMessage);
    } finally {
      setIsLoading(false);
    }
  };
  const router = useRouter();
  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <BackButton />
        <View style={{ gap: 5, marginTop: spacingY._20 }}>
          <Typo size={30} fontWeight={"800"}>
            Hey,
          </Typo>
          <Typo size={30} fontWeight={"800"}>
            Welcome Back!
          </Typo>
        </View>
        {/* form */}

        <View style={styles.form}>
          <Typo size={16} color={colors.textLighter}>
            Login
          </Typo>
          <Input
            placeholder="Enter  email"
            onChangeText={(value) => (emailRef.current = value)}
            icon={
              <Icons.Envelope
                size={32}
                weight="duotone"
                color={colors.neutral300}
              />
            }
          />
          <Input
            placeholder="Enter  password"
            onChangeText={(value) => (passwordRef.current = value)}
            secureTextEntry
            icon={
              <Icons.Lock
                size={32}
                weight="duotone"
                color={colors.neutral300}
              />
            }
          />
          <Typo size={14} color={colors.text} style={{ alignSelf: "flex-end" }}>
            Forgot Password?
          </Typo>
          <Button loading={isLoading} onPress={() => handleSubmit()}>
            <Typo color={colors.black} fontWeight={"600"}>
              Login
            </Typo>
          </Button>
        </View>

        {/* footer */}

        <View style={styles.footer}>
          <Typo size={15} color={colors.text}>
            Don't have an account?
          </Typo>
          <Pressable onPress={() => router.navigate("/(auth)/register")}>
            <Typo size={15} color={colors.primary} fontWeight={"700"}>
              Register
            </Typo>
          </Pressable>
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: spacingY._30,
    paddingHorizontal: spacingX._20,
  },
  welcomeText: {
    fontSize: verticalScale(20),
    fontWeight: "bold",
    color: colors.text,
  },
  form: {
    gap: spacingY._20,
  },
  forgotPassword: {
    textAlign: "right",
    fontWeight: "500",
    color: colors.text,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 5,
    alignItems: "center",
  },
  footerText: {
    textAlign: "center",
    color: colors.text,
    fontSize: verticalScale(15),
  },
});
