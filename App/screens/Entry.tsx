import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import { useRecoilValue } from 'recoil'
import { BaseButton } from '../components/base/Button'
import { userGetter } from '../state/user'

const EntryScreen = ({ navigation }) => {
  // get logged in users name
  const user = useRecoilValue(userGetter)
  console.log(user)
  return (
    <View>
      <Text>{'Hi, !'}</Text>

      <Image source={require('../assets/ladyIcon.png')} accessibilityLabel="App icon" />
      <BaseButton text="Let's go!" onPress={() => console.log('go to dashboard')}></BaseButton>
    </View>
  )
}

export default EntryScreen

const styles = StyleSheet.create({
  imageContainer: {
    display: 'flex',
    justifyContent: 'center',
    padding: 20,
    alignContent: 'center'
  },
  image: {
    height: 195,
    resizeMode: 'contain',
    alignSelf: 'center'
  }
})
