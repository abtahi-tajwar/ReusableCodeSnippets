import { StyleSheet, Text, View } from "react-native";
import Main from "./src/Main";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { SafeAreaView } from "react-native-safe-area-context";
import { PaperProvider } from "react-native-paper";
import "react-native-reanimated";
import "react-native-gesture-handler";
import { Provider } from "react-redux";
import store from "./src/redux/store";
import { useState } from "react";

export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <SafeAreaView style={{ height: "100%" }}>
          <NavigationContainer>
            <Main />
          </NavigationContainer>
        </SafeAreaView>
      </SafeAreaProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
