import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import { AuthProvider } from "@/contexts/authContext";

const Stacklayout = () => {
  return <Stack screenOptions={{ headerShown: false }}></Stack>;
};

export default function _layout() {
  return (
    <AuthProvider>
      <Stacklayout />
    </AuthProvider>
  );
}
const styles = StyleSheet.create({});
