import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import { useRecoilValue } from 'recoil'
import { BaseButton } from '../../components/base/Button'
import { userState } from '../../state/user'

const PasswordResetScreen = ({ navigation }) => {
  return (
    <View>
      <View style={styles.imageContainer}>
        <Image source={require('../../assets/ladyIcon.png')} accessibilityLabel="App icon" />
      </View>

      {/* <BaseButton text="Let's go!" onPress={() => console.log('go to dashboard')}></BaseButton> */}
    </View>
  )
}

export default PasswordResetScreen

const styles = StyleSheet.create({
  imageContainer: {
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
