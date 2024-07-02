import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useAppSelector } from '../../redux/hooks'
import { useTheme } from 'react-native-paper'

export default function CustomText({ variant = '300', children, color = 'default', ...props } : PropTypes.CustomText) {
  const darkMode = useAppSelector(state => state.config.darkMode)
  const theme = useTheme<Config.Theme>();
  const styles = createStyles({ theme, color })
  return (
    <View>
    {(variant === '300') && <Text style={[styles.textStyle, { fontFamily: 'Rubik_300Light' }]}>{children}</Text>}
    {(variant === '300i') && <Text style={[styles.textStyle, { fontFamily: 'Rubik_300Light_Italic' }]}>{children}</Text>}
    {(variant === '400') && <Text style={[styles.textStyle, { fontFamily: 'Rubik_400Regular' }]}>{children}</Text>}
    {(variant === '400i') && <Text style={[styles.textStyle, { fontFamily: 'Rubik_400Regular_Italic' }]}>{children}</Text>}
    {(variant === '500') && <Text style={[styles.textStyle, { fontFamily: 'Rubik_500Medium' }]}>{children}</Text>}
    {(variant === '500i') && <Text style={[styles.textStyle, { fontFamily: 'Rubik_500Medium_Italic' }]}>{children}</Text>}
    {(variant === '600') && <Text style={[styles.textStyle, { fontFamily: 'Rubik_600SemiBold' }]}>{children}</Text>}
    {(variant === '600i') && <Text style={[styles.textStyle, { fontFamily: 'Rubik_600SemiBold_Italic' }]}>{children}</Text>}
    {(variant === '700') && <Text style={[styles.textStyle, { fontFamily: 'Rubik_700Bold' }]}>{children}</Text>}
    {(variant === '700i') && <Text style={[styles.textStyle, { fontFamily: 'Rubik_700Bold_Italic' }]}>{children}</Text>}
    {(variant === '800') && <Text style={[styles.textStyle, { fontFamily: 'Rubik_800ExtraBold' }]}>{children}</Text>}
    {(variant === '800i') && <Text style={[styles.textStyle, { fontFamily: 'Rubik_800ExtraBold_Italic' }]}>{children}</Text>}
    {(variant === '900') && <Text style={[styles.textStyle, { fontFamily: 'Rubik_900Black' }]}>{children}</Text>}
    {(variant === '900i') && <Text style={[styles.textStyle, { fontFamily: 'Rubik_900Black_Italic' }]}>{children}</Text>}
    </View>
  )
}

const createStyles = ({ theme, color } : { theme: Config.Theme, color : PropTypes.CustomTextColorEnum }) => {
  console.log("Theme colors text", theme.colors.text)
  return StyleSheet.create({
    textStyle: {
      color: color === 'default' ? theme.colors.text : theme.colors.textPrimary
    }
  })
}