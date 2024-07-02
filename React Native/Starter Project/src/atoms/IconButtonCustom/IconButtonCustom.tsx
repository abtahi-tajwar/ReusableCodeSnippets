import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Button } from "react-native-paper";

export const IconButtonCustom = ({ children, onPress, height, width }: PropTypes.IconButtonCustom) => {
  return (
    <Button
      mode="text"
      onPress={() => {
        if (onPress) onPress();
      }}
      style={{
        paddingHorizontal: 0,
        minWidth: 'auto',
        height: height ?? undefined,
        width: width ?? undefined
      }}
    >
      {children}
    </Button>
  );
}

const styles = StyleSheet.create({});
