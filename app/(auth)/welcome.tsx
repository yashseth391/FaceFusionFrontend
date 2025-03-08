import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { colors } from "@/constants/theme";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Typo from "@/components/Typo";
import Button from "@/components/Button";
import Animated, {
  FadeIn,
  FadeInDown,
  FadeOutDown,
} from "react-native-reanimated";
import { useRouter } from "expo-router";
const Home = () => {
  const router = useRouter();
  return (
    <View
      style={{
        display: "flex",
        alignItems: "center",
        backgroundColor: colors.neutral900,
      }}
    >
      <TouchableOpacity onPress={() => router.push("/(auth)/login")}>
        <Typo size={20} color={colors.white}>
          Sign In
        </Typo>
      </TouchableOpacity>
      <Animated.Image
        entering={FadeIn.duration(3000).springify().damping(12)}
        source={require("../../assets/images/welcome.png")}
        style={styles.Bg}
        resizeMode="contain"
      />
      <Animated.View
        style={styles.content}
        entering={FadeInDown.duration(3000)}
      >
        <Text style={styles.contentText}>Photo Manager </Text>
        <Text style={styles.subContentText}>
          Stay on Track ,Event by Event by managing your photos
        </Text>

        <Button onPress={() => router.push("/(auth)/register")}>
          <Typo color={colors.neutral900} fontWeight={"600"}>
            Sign Up
          </Typo>
        </Button>
        <Text style={styles.condition}>
          * By Login/SignUp you will agree to our terms and conditions *{" "}
        </Text>
      </Animated.View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  Bg: {
    width: wp("100%"),
    height: hp("45%"),
    marginTop: 30,

    borderRadius: 20,
    alignItems: "center",
  },
  button: {
    backgroundColor: colors.white,
    padding: 12,
    paddingHorizontal: 5,
    borderRadius: 105,
    marginTop: 20,
  },
  buttonText: {
    textAlign: "center",
    color: colors.primary,
    fontSize: 20,
  },
  condition: {
    fontSize: 13,
    color: colors.white,
    textAlign: "center",
  },
  content: {
    width: "100%",
    height: "100%",
    padding: 20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: "#000000",
    ...Platform.select({
      ios: {
        shadowColor: "#000000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
      android: {
        elevation: 24,
        shadowColor: "#ffffff",
        overflow: "hidden",
      },
    }),
  },
  contentText: {
    fontSize: 40,
    fontWeight: "bold",
    textAlign: "center",
    color: colors.white,
  },
  subContentText: {
    fontSize: 20,
    textAlign: "center",
    color: colors.white,
    marginTop: 30,
  },
});
