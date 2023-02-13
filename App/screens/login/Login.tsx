import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import { useRecoilValue } from 'recoil'
import { BaseButton } from '../../components/base/Button'
import { userState } from '../../state/user'

const LoginScreen = ({ navigation }) => {
  const handleLogin = () => {
    // API call to login
    // then navigate to dashboard
    navigation.navigate('Dashboard')
  }
  return (
    <View>
      <View style={styles.imageContainer}>
        <Image source={require('../../assets/ladyIcon.png')} accessibilityLabel="App icon" />
      </View>

      <BaseButton text="Let's go!" onPress={handleLogin}></BaseButton>
    </View>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
  imageContainer: {
    display: 'flex',
    justifyContent: 'center',
    padding: 20,
    alignContent: 'center'
  },
  image: {
    height: 195,
    resizeMode: 'contain'
  }
})
