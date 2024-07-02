import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useTheme } from "react-native-paper";

export function ScreenContainer({ children, style, ...props }: PropTypes.ScreenContainer) {
  const theme = useTheme<Config.Theme>();
  const styles = createStyles({ theme })
    return <View style={[style, styles.container]} {...props}>{children}</View>;
}

const createStyles = ({ theme }: { theme: Config.Theme }) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
  });
};
