import { StyleSheet } from 'react-native'
import { StatusBar } from "expo-status-bar";
import { Platform } from 'react-native';
import React from 'react'
import { useAppSelector } from '../../redux/hooks';
import { useTheme } from 'react-native-paper';

export function CustomStatusBar() {
  const darkMode = useAppSelector(state => state.config.darkMode)
  const theme = useTheme();
  return (
    Platform.OS === 'ios' ? 
        <StatusBar style={'auto'} />
        : <StatusBar style={!darkMode ? 'dark' : 'light'}  backgroundColor={theme.colors.background} />
    
  )
}

const styles = StyleSheet.create({})