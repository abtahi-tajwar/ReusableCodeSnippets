import {
    MD3LightTheme as DefaultTheme,
    PaperProvider,
} from 'react-native-paper';
// import { MD3Theme } from 'react-native-paper';
export const getTheme = (dark : boolean = false) : Config.Theme =>  {
    return {
        ...DefaultTheme,
        // Specify custom property in nested object
        dark,
        colors: {
            ...DefaultTheme.colors,
            primary: !dark ? '#0A2647' : '#D6E6F8',
            primaryLight: dark ? ['#144272', '#205295', '#2C74B3'] : ['#C1DBF6', '#9BBAE2', '#709DC5'],
            accent: '#DADADA',
            accentLight: '#FCFFFD',
            primaryGray: '#A0AAC0',
            primaryGrayLight: '#DADADA',
            background: !dark ? '#ffffff' : '#000000',
            backgroundPrimary: '#0A2647',
            backgroundPrimaryLight: '#144272',
            text: !dark ? '#000000' : "#ffffff",
            textPrimary: !dark ? '#0A2647' : '#D6E6F8'
        },
    }
}