import React, { useState, useEffect, useRef } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Animated,
  Alert,
  ScrollView,
  Text,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { SafeAreaView } from "react-native-safe-area-context";

import Card from "@/components/ExploreComponents/ClubCardExplore";
import NewsCard from "@/components/ExploreComponents/NewsCardExplore";

export default function SearchPage() {
  const searchPressed = () => {
    Alert.alert("Search activated!");
  };

  // Texts useStates for the searchBars
  const [text, setText] = useState("");
  const [text1, setText1] = useState("");
  const [text2, setText2] = useState("");

  // These are useStates for whether the notification and the menu
  // icon are pressed or not
  const [isNotificationFilled, setNotificationFilled] = useState(false);
  const [isMenuFilled, setMenuFilled] = useState(false);

  // This is the useState for showing or hiding the smaller search bars
  const [isOptionsVisible, setOptionsVisible] = useState(false);

  {
    /*
    useState for notification badge on top of the notification icon
    In this example, I added 5 as the number of notifications

    - Lynn
  */
  }
  const [notificationCount, setNotificationCount] = useState(2);

  // useRef for animation
  const heightAnimation = useRef(new Animated.Value(0)).current;
  const opacityAnimation = useRef(new Animated.Value(0)).current;

  // useEffect for transition animation
  useEffect(() => {
    if (isOptionsVisible) {
      Animated.parallel([
        Animated.timing(heightAnimation, {
          toValue: 70,
          duration: 300,
          useNativeDriver: false,
        }),
        Animated.timing(opacityAnimation, {
          toValue: 1,
          duration: 400,
          useNativeDriver: false,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(heightAnimation, {
          toValue: 0,
          duration: 300,
          useNativeDriver: false,
        }),
        Animated.timing(opacityAnimation, {
          toValue: 0,
          duration: 350,
          useNativeDriver: false,
        }),
      ]).start();
    }
  }, [isOptionsVisible]);

  return (
    <SafeAreaView className="flex-1 justify-center px-4">
      <View className="flex-row justify-between items-center px-4 py-3 bg-black">
        {/* This is the left side of the "Nav Bar" on the top containing the icon
          and the search text */}
        <View className="flex-row gap-3">
          <Image
            source={require("$/images/tspIcon.png")}
            className="w-8 h-8"
          />
          <Text className=" text-xl font-bold text-slate-100">Search</Text>
        </View>

        {/*
          This is the right side of the "Nav Bar" on the top containing the
          notification bell icon and the hamburger menu icon.

          I made them filled out when pressed so that, in the future, when we
          implement a "notification screen" where they see all there notifications
          and when we implement a "menu screen", we don't need to add the animations then.

          I also added a badge with numbers under the notification bell so that when we have
          a database, we can just easily add the number of notifications each user has.

          - Lynn
        */}

        <View className="flex-row items-center space-x-4 gap-3">
          {/* Notification Icon*/}
          <View className="relative">
            <TouchableOpacity
              onPress={() => setNotificationFilled(!isNotificationFilled)}
            >
              <Ionicons
                name={
                  isNotificationFilled
                    ? "notifications"
                    : "notifications-outline"
                }
                size={24}
                color="white"
              />
            </TouchableOpacity>

            {/* Notification Numbers */}
            {notificationCount > 0 && (
              <View className="absolute -top-2 -right-2 bg-red-600 rounded-full w-5 h-5 justify-center items-center">
                <Text className="text-white text-xs font-bold">
                  {notificationCount}
                </Text>
              </View>
            )}
          </View>

          {/* Hamburger Menu Icon */}
          <TouchableOpacity onPress={() => setMenuFilled(!isMenuFilled)}>
            <Ionicons
              name={isMenuFilled ? "menu-sharp" : "menu-outline"}
              size={24}
              color="white"
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* This is the search bar under the navigation bar. */}

      <View className="flex-row items-center border border-gray-300 rounded-3xl bg-white px-3 py-4 mx-4">
        <Ionicons name="search" size={24} color="black" className="mr-2" />
        <TextInput
          className="flex-1 text-base"
          placeholder="Search..."
          cursorColor="black"
          value={text}
          onChangeText={setText}
        />
        {text.length > 0 && (
          <TouchableOpacity onPress={() => setText("")}>
            <Ionicons name="close-circle" size={24} color="gray" />
          </TouchableOpacity>
        )}

        {/* Options Icon */}
        <TouchableOpacity onPress={() => setOptionsVisible(!isOptionsVisible)}>
          <Ionicons name="options-outline" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {/* These are the two search bars that would "filter" the search for the field above. */}
      {/* Animated View for the two smaller search bars */}
      <Animated.View
        style={{
          height: heightAnimation,
          opacity: opacityAnimation,
          overflow: "hidden",
        }}
      >
        <View className="flex-row gap-2 flex-grow px-4 py-2">
          {/* First Search Bar */}
          <View className="flex-1 flex-row items-center border border-gray-300 rounded-3xl bg-white px-3 py-4">
            <Ionicons name="search" size={24} color="black" className="mr-2" />
            <TextInput
              className="flex-1 text-base"
              placeholder="Clubs, Programs..."
              value={text1}
              onChangeText={setText1}
            />
            {text1.length > 0 && (
              <TouchableOpacity onPress={() => setText1("")}>
                <Ionicons name="close-circle" size={24} color="gray" />
              </TouchableOpacity>
            )}
            <Ionicons
              name="albums-outline"
              size={24}
              color="black"
              className="ml-2"
            />
          </View>

          {/* Second Search Bar */}
          <View className="flex-1 flex-row items-center border border-gray-300 rounded-3xl bg-white px-3 py-4">
            <Ionicons name="search" size={24} color="black" className="mr-2" />
            <TextInput
              className="flex-1 text-base"
              placeholder="Location..."
              value={text2}
              onChangeText={setText2}
            />
            {text2.length > 0 && (
              <TouchableOpacity onPress={() => setText2("")}>
                <Ionicons name="close-circle" size={24} color="gray" />
              </TouchableOpacity>
            )}
            <Ionicons
              name="location-outline"
              size={24}
              color="black"
              className="ml-2"
            />
          </View>
        </View>
      </Animated.View>

      {/* Search Button */}
      <TouchableOpacity
        className="items-center border rounded-3xl bg-white px-3 py-3 mx-4 my-2"
        activeOpacity={0.8}
        //onPress={searchPressed}
      >
        <Text>Search</Text>
      </TouchableOpacity>

      <ScrollView>
        <View className="my-10 bg-zinc-900 rounded-t-3xl">
          {/* This is the club recommendation section */}
          <View className="flex flex-col p-4 gap-2">
            {/* Top two texts for this section */}
            <Text className="text-gray-100 text-2xl">Clubs you may like!</Text>
            <Text className="text-gray-100 text-sm">
              Hello, here are the recommended clubs that you might find
              interesting here at Skyline College!
            </Text>

            {/*

            This section is for the recommended clubs. I made it scrollable
            as I thought it would be cleaner that way and things wouldn't
            be as congested anymore. After all, in the future, we would
            be adding more cards and such.

            - Lynn

          */}
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: 2 }}
              decelerationRate={"normal"}
            >
              <View className="flex flex-row gap-2">
                <Card
                  type="Club"
                  field="Data Science"
                  image={require("$/images/ClubImagesForExplore/genericDEI(1).jpg")}
                  title="Data Science Club"
                  description="Hello, this is the Data Science Club available at Skyline College. We analyze and visualize data and derive conclusions from those."
                />
                <Card
                  type="Club"
                  field="Math"
                  image={require("$/images/ClubImagesForExplore/genericDEI(2).jpg")}
                  title="Math Club"
                  description="Hello, come join the Math Club at Skyline to explore mathematical concepts, and engage in problem-solving activities! Everyone is welcome!"
                />
                <Card
                  type="Club"
                  field="Engineering"
                  image={require("$/images/ClubImagesForExplore/genericDEI(3).jpeg")}
                  title="Engineering & Robotics Club"
                  description="Hello, this is the Engineering & Robotics Club at Skyline College. Join the Engineering & Robotics Club to build exciting projects, and collaborate with peers."
                />
              </View>
            </ScrollView>
          </View>

          <View className="flex flex-col gap-3 p-4">
            <View className=" flex flex-col">
              <Text className="text-gray-100 text-2xl">
                Other News From Skyline Shine!
              </Text>
              <Text className="text-gray-100 text-xs">
                The Weekly Newsletter Of Skyline College
              </Text>
            </View>
            <View className="flex flex-col items-center gap-3">
              <NewsCard
                title="International Student Club’s Successful Cultural Exchange Day"
                date="October 11, 2024"
                image={require("$/images/NewsImagesForExplore/testNews.png")}
                desc="On Friday, September 27, 2024, the International Student Club (ISC)
              hosted a cultural exchange event that was formally open to all students and
              staff. This was their third general meeting for the 2024-2025 academic year,
              filled with enjoyable activities and a diverse map-pinning game featuring various
              countries. The meeting was a huge success, attended by 23 students and staff from
              various departments."
              />
              <NewsCard
                title="International Student Club’s Successful Cultural Exchange Day"
                date="October 11, 2024"
                image={require("$/images/NewsImagesForExplore/testNews.png")}
                desc="On Friday, September 27, 2024, the International Student Club (ISC) hosted a cultural exchange event that was formally open to all students and
              staff. This was their third general meeting for the 2024-2025 academic year,
              filled with enjoyable activities and a diverse map-pinning game featuring various
              countries. The meeting was a huge success, attended by 23 students and staff from
              various departments."
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}