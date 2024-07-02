import { Platform, StyleSheet, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Appearance } from 'react-native';
import React, { useEffect, useState } from "react";
import * as SplashScreen from 'expo-splash-screen';
import useInitialize from "./hooks/useInitialize";
import HomeTabs from "./screens/HomeTabs";
import { CustomStatusBar, Sidenav, TopNavigation } from "./components";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./screens/Auth/Login";
import { PaperProvider, useTheme } from "react-native-paper";
import { getTheme } from "./theme";
import { useAppDispatch, useAppSelector } from "./redux/hooks";
import { setDarkTheme } from "./redux/slices/config";

SplashScreen.preventAutoHideAsync();

export default function Main() {
  const Stack = createNativeStackNavigator<Config.ScreensStack>();
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const [appIsReady, setAppIsReady] = useState(false);
  const [sideNavOpen, setSidenavOpen] = useState(false);
  const darkMode = useAppSelector(state => state.config.darkMode)
  const { loading } = useInitialize();

  useEffect(() => {
    if (!loading) {
      setAppIsReady(true);
      SplashScreen.hideAsync();
    }
  }, [loading])

  return (
    appIsReady && (
      <PaperProvider theme={getTheme(darkMode)}>
        <CustomStatusBar />
        <TopNavigation loggedIn={false} setSidenavOpen={setSidenavOpen} />
        <Sidenav open={sideNavOpen} setOpen={setSidenavOpen} />
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="HomeTabs" component={HomeTabs} />
          <Stack.Screen name="Login" component={Login} />
        </Stack.Navigator>
        {/* <HomeTabs /> */}
      </PaperProvider>
    )
  );
}
