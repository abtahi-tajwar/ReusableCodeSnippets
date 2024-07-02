import { StyleSheet, Text, View, Image, TouchableHighlight } from "react-native";
import React, { useState } from "react";
import { CaretLeftIcon, HamburgerIcon, NotificationIcon, UserIcon } from "../../assets/Icons";
import { Menu, Divider, IconButton } from "react-native-paper";
import { useTheme } from "react-native-paper";
import { IconButtonCustom } from "../../atoms";
import { Link, useNavigation } from "@react-navigation/native";
import { useAppSelector } from "../../redux/hooks";
import useAppNavigation from "../../hooks/useAppNavigation";
  

const BlankAvatar = require("../../assets/blank-avatar.jpeg");

export function TopNavigation({ loggedIn, setSidenavOpen }: PropTypes.TopNavigation) {
  const theme = useTheme<Config.Theme>();
  const header = useAppSelector(state => state.header)
  const navigator = useAppNavigation();
  const styles = createStyles({ theme });
  const [profileMenuVisible, setProfileMenuVisible] = useState(false);
  const [notificationDropdownVisible, setNotificationDropdownVisible] = useState(false);
  const handleUserIconPress = () => {
    setProfileMenuVisible(true);
  };
  const handleNotificationIconPress = () => {
    setNotificationDropdownVisible(false)
  }
  const handleHamburgerClick = () => {
    setSidenavOpen(true);
  };
  const handleNavigateBack = (goBackFunc : any) => {
    if (goBackFunc) goBackFunc()
  }
  const handleMenuClick = (screen : string) => {
    navigator.navigate(screen)
    setProfileMenuVisible(false)
  }
  return (
    <View style={styles.container}>
      <View style={styles.leftActionIconsContainer}>
        {header.goBackFunc && <IconButton icon={() => <CaretLeftIcon color={theme.colors.textPrimary} />} onPress={() => handleNavigateBack(header.goBackFunc)} />}
        <IconButtonCustom onPress={handleHamburgerClick}>
          <HamburgerIcon color={theme.colors.primary} />
        </IconButtonCustom>
      </View>
      <View style={styles.actionIconsContainer}>
        {loggedIn && (
          <IconButtonCustom onPress={handleNotificationIconPress}>
            <NotificationIcon color={theme.colors.primaryGray} />
          </IconButtonCustom>
        )}
        {!loggedIn ? (
          <Menu
            visible={profileMenuVisible}
            onDismiss={() => setProfileMenuVisible(false)}
            anchor={
              <IconButtonCustom onPress={handleUserIconPress}>
                <UserIcon color={theme.colors.primaryGray} />
              </IconButtonCustom>
            }
          >
            <Menu.Item leadingIcon="login" onPress={() => handleMenuClick('Login')} title="Login" />
            <Menu.Item leadingIcon="book" onPress={() => handleMenuClick('Login')} title="Register" />
          </Menu>
        ) : (
          <Image source={BlankAvatar} style={styles.avatarImage} />
        )}
      </View>
    </View>
  );
}

const createStyles = ({ theme }: { theme: Config.Theme }) => {
  return StyleSheet.create({
    container: {
      position: "absolute",
      left: 0,
      top: 0,
      right: 0,
      width: "100%",
      height: 60,
      backgroundColor: theme.colors.background,
      zIndex: 1000,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingHorizontal: 24,
      paddingVertical: 10,
    },
    leftActionIconsContainer: {
      flexDirection: 'row',
      alignItems: 'center'
    },
    actionIconsContainer: {
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
    },
    avatarImage: {
      height: 30,
      width: 30,
      borderRadius: 30,
      objectFit: "cover",
    },
  });
};
