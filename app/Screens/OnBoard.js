/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  useWindowDimensions,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useRef, useState } from "react";
import { onboardingData } from "./onBoardData";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useRouter } from "expo-router";

const RenderItem = ({ item }) => {

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        width: wp('100%'),

      }}
    >
      <View
        style={{
          marginTop: hp(0.01),
          marginBottom: hp(0.01),
        }}
      >
        <View>
          {item.id === 1 ? (
            <View style={{ marginTop: 20 }}>
              <Image
                source={item.image}
                style={{
                  width: wp(90),
                  height: hp(40),
                  resizeMode: "contain",
                }}
              />
            </View>
          ) : (
            <View>
              <Image
                source={item.image}
                style={{
                  width: wp(90),
                  height: hp(40),
                  resizeMode: "contain",
                }}
              />
            </View>
          )}
        </View>
      </View>

      <Text
        style={{
          marginTop: 32,
          fontSize: 33,
          fontFamily: "Poppins",
          marginHorizontal: 48,
          textAlign: "center",
          fontWeight: "700",
        }}
      >
        {item.title}
      </Text>
      <Text
        style={{
          marginTop: 12,
          fontSize: 14,
          textAlign: "center",
          color: "#8E9295",
          fontWeight: "300",
          marginHorizontal: 72,
          lineHeight: 24,
          marginBottom: 24,
        }}
      >
        {item.description}
      </Text>
    </View>
  );
};

const OnBoard = () => {
  const { height, width } = useWindowDimensions();
  const flatListRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const router = useRouter();

  const handleScroll = (event) => {
    const slideIndex = Math.round(event.nativeEvent.contentOffset.x / width);
    setActiveIndex(slideIndex);
  };

  const handleNext = () => {
    if (activeIndex < onboardingData.length - 1) {
      flatListRef.current.scrollToIndex({ index: activeIndex + 1 });
    }
  };

  const handlePrev = () => {
    if (activeIndex > 0) {
      flatListRef.current.scrollToIndex({ index: activeIndex - 1 });
    }
  };

  const handleComplete = async () => {
    await AsyncStorage.setItem("start", "start");
    router.replace("/(auth)/welcome");
  };

  // const getStarted = async () => {
  //   try {
  //     const storedToken = await AsyncStorage.getItem("start");
  //     console.log("Stored token:", storedToken);

  //     if (storedToken === "start") {
  //       router.replace("/(auth)/login");
  //     }
  //   } catch (error) {
  //     console.error("Error checking token:", error);
  //   }
  // };

  // useEffect(() => {
  //   getStarted();
  // }, []);

  return (
    <View style={[styles.container, { height }]}>
      <View
        style={{ flex: 0.8, justifyContent: "center", alignItems: "center" }}
      >
        <FlatList
          data={onboardingData}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <RenderItem item={item} />}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          bounces={false}
          ref={flatListRef}
          onScroll={handleScroll}
          snapToInterval={width}
          decelerationRate="fast"
        />
      </View>

      <View style={{ flex: 0.2 }}>
        <View
          style={{ flexDirection: "row", justifyContent: "center", height: 32 }}
        >
          {onboardingData.map((_, index) => (
            <View
              key={index}
              style={{
                height: index === activeIndex ? 13 : 10,
                width: index === activeIndex ? 13 : 10,
                borderRadius: 40,
                backgroundColor: index === activeIndex ? "black" : "#D3D3D3",
                marginHorizontal: 8,
              }}
            />
          ))}
        </View>

        <View
          style={{
            backgroundColor: "#FCFCFD",
            borderWidth: 0.5,
            borderColor: "#0F0F0F1F",
            height: 54,
            width: "50%",
            alignSelf: "center",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            shadowColor: "#0F0F0F1F",
            borderRadius: 20,
            marginVertical: 16,
          }}
        >
          {activeIndex !== onboardingData.length - 1 ? (
            <>
              <TouchableOpacity
                style={{ padding: 15 }}
                onPress={handlePrev}
                disabled={activeIndex === 0}
              >
                <FontAwesome
                  size={18}
                  color={activeIndex === 0 ? "#E3E3E3" : "black"}
                  name="long-arrow-left"
                />
              </TouchableOpacity>
              <View
                style={{
                  width: 1,
                  height: "50%",
                  backgroundColor: "#D3D3D3",
                  marginHorizontal: 12,
                }}
              />
              <TouchableOpacity
                style={{ padding: 15 }}
                onPress={handleNext}
              >
                <FontAwesome
                  size={18}
                  color="black"
                  name="long-arrow-right"
                />
              </TouchableOpacity>
            </>
          ) : (
            <TouchableOpacity
              style={{
                width: "100%",
                height: "100%",
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={handleComplete}
            >
              <Text style={{ color: "blue", fontWeight: "600" }}>Get Started</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

export default OnBoard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});