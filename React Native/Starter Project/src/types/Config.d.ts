namespace Config {
    type Theme = import('react-native-paper').MD3Theme & {
        colors: {
            primaryLight: Array<string>,
            accent: string
            accentLight: string,
            primaryGray: string,
            primaryGrayLight: string,
            background: string,
            text: string,
            backgroundPrimary: string,
            backgroundPrimaryLight: string,
            textPrimary: string
        }
    }
    type ScreensStack = {
        HomeTabs: undefined;
        Login: undefined;
    }
    type StackNavigation = import('@react-navigation/stack').StackNavigationProp<ScreensStack>
}