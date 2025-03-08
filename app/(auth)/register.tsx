import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
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
import { useAuth } from "@/contexts/authContext";
const Register = () => {
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const nameRef = useRef("");
  const [isLoading, setIsLoading] = useState(false);
  const { register: registerUser } = useAuth();
  const handleSubmit = async () => {
    if (!emailRef.current || !passwordRef.current) {
      Alert.alert("Please fill all fields");
      return;
    }

    setIsLoading(true);
    const res = await registerUser(
      emailRef.current,
      passwordRef.current,
      nameRef.current
    );
    console.log("register result :", res);
    if (!res.success) {
      Alert.alert("Sign up", res.msg);
    } else {
      router.navigate("/(auth)/login");
    }
    setIsLoading(false);
  };
  const router = useRouter();
  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <BackButton />
        <View style={{ gap: 5, marginTop: spacingY._20 }}>
          <Typo size={30} fontWeight={"800"}>
            Let's
          </Typo>
          <Typo size={30} fontWeight={"800"}>
            Get Started!
          </Typo>
        </View>
        {/* form */}
        <View style={styles.form}>
          <Typo size={16} color={colors.textLighter}>
            Create an account
          </Typo>
          <Input
            placeholder="Enter  name"
            onChangeText={(value) => (nameRef.current = value)}
            icon={
              <Icons.User
                size={32}
                weight="duotone"
                color={colors.neutral300}
              />
            }
          />
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

          <Button loading={isLoading} onPress={() => handleSubmit()}>
            <Typo color={colors.black} fontWeight={"600"}>
              Register
            </Typo>
          </Button>
        </View>
        {/* footer */}

        <View style={styles.footer}>
          <Typo size={15} color={colors.text}>
            Already have an account?
          </Typo>
          <Pressable onPress={() => router.navigate("/(auth)/login")}>
            <Typo size={15} color={colors.primary} fontWeight={"700"}>
              Login
            </Typo>
          </Pressable>
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default Register;

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
