import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { useAppDispatch } from '../../redux/hooks';
import useAppNavigation from '../../hooks/useAppNavigation';

export default function Login() {
    const navigate = useAppNavigation();
  return (
    <View style={styles.container}>
      <Text>Login</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})