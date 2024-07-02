import { StyleSheet, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "./Home/Home";
import Explore from "./Explore/Explore";
import MyLearning from "./MyLearnings/MyLearning";
import Saved from "./Saved/Saved";
import Account from "./Account/Account";
import { RouteProp, ParamListBase } from "@react-navigation/native";
import { AccountIconFilled, HomeIcon, PlayIconFilled, SaveIconFilled, SearchIcon } from "../assets/Icons";
import { useTheme } from "react-native-paper";

export default function HomeTabs() {
  const theme = useTheme<Config.Theme>();
  const Tab = createBottomTabNavigator();
  const renderTabBarIcon = (route: RouteProp<ParamListBase, string>) => {
    if (route.name === "Home") {
      return <HomeIcon color={"white"} />;
    } else if (route.name === "Explore") {
      return <SearchIcon />
    } else if (route.name === "My Learning") {
      return <PlayIconFilled />
    } else if (route.name === "Saved") {
      return <SaveIconFilled />
    } else if (route.name === "Account") {
      return <AccountIconFilled />
    }

    // You can return any component that you like here!
  };
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: () => renderTabBarIcon(route),
        // tabBarActiveTintColor: "white",
        // tabBarInactiveTintColor: "gray",
        tabBarStyle: {
          backgroundColor: theme.colors.backgroundPrimaryLight,
          height: 64,
          paddingBottom: 0,
          // borderTopColor: "transparent",
        },
        tabBarItemStyle: {
          padding: 10,
        },
        tabBarLabelStyle: {
          color: "white",
          fontSize: 8,
          fontFamily: "Rubik_300Light",
        },
        tabBarActiveBackgroundColor: theme.colors.backgroundPrimary,
        // tabBarItemStyle: {
        //   // padding: 10,
        // },
      })}
    >
      <Tab.Screen name="Home" component={Home} options={{ headerShown: false }} />
      <Tab.Screen name="Explore" component={Explore} options={{ headerShown: false }} />
      <Tab.Screen name="My Learning" component={MyLearning} options={{ headerShown: false }} />
      <Tab.Screen name="Saved" component={Saved} options={{ headerShown: false }} />
      <Tab.Screen name="Account" component={Account} options={{ headerShown: false }} />
    </Tab.Navigator>
  );
}
