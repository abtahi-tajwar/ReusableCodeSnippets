import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { Switch } from 'react-native-paper'
import { ScreenContainer } from '../../components'
import CustomText from '../../atoms/CustomText/CustomText'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { toggleDarkTheme } from '../../redux/slices/config'

export default function Home() {
  // const [darkMode, setDarkMode] = useState(false)
  const darkMode = useAppSelector(state => state.config.darkMode)
  const dispatch = useAppDispatch()
  const handleToggle = () => {
    dispatch(toggleDarkTheme())
  }
  return (
    <ScreenContainer style={styles.container}>
      <Switch value={darkMode} onChange={handleToggle}/>
      <CustomText>Home</CustomText>
    </ScreenContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  }
})