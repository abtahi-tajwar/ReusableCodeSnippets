import { StyleSheet, Text, View, Image, TouchableHighlight } from "react-native";
import { useTheme, Switch } from "react-native-paper";
import { Dimensions } from "react-native";
import React from "react";
import { CompletedExamsIcon, FAQIcon, HomeIcon, MyCoursesIcon, SettingsIcon, SidenavLogo, SupportIcon } from "../../assets/Icons";
import { View as MotiView, AnimatePresence } from "moti";
import CustomText from "../../atoms/CustomText/CustomText";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { toggleDarkTheme } from "../../redux/slices/config";

export function Sidenav({ open, setOpen }: PropTypes.Sidenav) {
  const theme = useTheme<Config.Theme>();
  const dispatch = useAppDispatch();
  const darkMode = useAppSelector((state) => state.config.darkMode);

  const { height, width } = Dimensions.get("window");
  const styles = createStyles({ theme, screenHeight: height, screenWidth: width });
  const NavItems = [
    {
      label: "Home",
      icon: <HomeIcon color={theme.colors.text} />,
      url: "",
    },
    {
      label: "My Courses",
      icon: <MyCoursesIcon color={theme.colors.text} />,
      url: "",
    },
    {
      label: "Completed Exams",
      icon: <CompletedExamsIcon color={theme.colors.text} />,
      url: "",
    },
    {
      label: "Settings",
      icon: <SettingsIcon color={theme.colors.text} />,
      url: "",
    },
    {
      label: "Support",
      icon: <SupportIcon color={theme.colors.text} />,
      url: "",
    },
    {
      label: "FAQ",
      icon: <FAQIcon color={theme.colors.text} />,
      url: "",
    },
  ];

  const handleDarkModeToggle = () => {
    // console.log("Change pressing");
    dispatch(toggleDarkTheme());
  };
  return (
    <View style={styles.container}>
      {open && <View style={styles.overlay} onTouchEnd={() => setOpen(false)}></View>}
      <AnimatePresence>
        {open && (
          <MotiView
            from={{
              marginLeft: -300,
            }}
            animate={{
              marginLeft: 0,
            }}
            exit={{
              marginLeft: -300,
            }}
            exitTransition={{
              type: "timing",
              //   duration: 0.3,
            }}
            transition={{
              type: "timing",
              //   duration: 0.3
            }}
            style={styles.sidenavContainer}
          >
            <View style={styles.sidenavLogo}>
              <SidenavLogo color={theme.colors.primary} secondaryColor={theme.colors.primaryLight[0]} />
            </View>
            <View style={styles.menuItemsContainer}>
              {NavItems.map((item, i) => (
                <TouchableHighlight key={i} onPress={() => console.log("Pressed on", i)} activeOpacity={0.1} underlayColor={theme.colors.primaryGray}>
                  <View style={styles.menuItem}>
                    {item.icon}
                    <CustomText>{item.label}</CustomText>
                  </View>
                </TouchableHighlight>
              ))}
            </View>
            <View style={styles.darkModeSettingsContainer}>
              <CustomText>Dark Mode</CustomText>
              <Switch value={darkMode} onTouchEnd={handleDarkModeToggle} />
            </View>
          </MotiView>
        )}
      </AnimatePresence>
    </View>
  );
}

type StyleProps = { theme: Config.Theme; screenHeight: number; screenWidth: number };
const createStyles = ({ theme, screenHeight, screenWidth }: StyleProps) => {
  return StyleSheet.create({
    container: {
      zIndex: 1001,
      position: "absolute",
    },
    overlay: {
      position: "absolute",
      height: screenHeight,
      width: screenWidth,
      zIndex: -1,
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    sidenavContainer: {
      position: "absolute",
      zIndex: 1,
      backgroundColor: theme.colors.background,
      left: 0,
      top: 0,
      width: 300,
      height: screenHeight,
      paddingTop: 100,
      //   paddingHorizontal: 25,
    },
    sidenavLogo: {
      alignSelf: "center",
    },
    menuItemsContainer: {
      marginTop: 40,
    },
    menuItem: {
      flexDirection: "row",
      gap: 12,
      alignItems: "center",
      paddingVertical: 8,
      paddingHorizontal: 25,
    },
    darkModeSettingsContainer: {
      paddingHorizontal: 25,
      marginTop: 20,
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
    },
  });
};
