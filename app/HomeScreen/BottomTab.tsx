import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Ionicons } from "@expo/vector-icons";
import Home from "./Home";
import Result from "./Result";
import Profile from "./Profile";
// import { useRouter } from "expo-router";

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  // const router = useRouter();
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName: "home" | "images" | "person" | undefined;

          if (route.name === "Home") {
            iconName = "home";
          } else if (route.name === "Result") {
            iconName = "images";
          } else if (route.name === "Profile") {
            iconName = "person";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#9664FF",
        tabBarInactiveTintColor: "#7D7F88",
        tabBarStyle: {
          height: "7%", // You can also adjust the height if needed
        },
      })}
      initialRouteName="Home"
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Result"
        component={Result}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
