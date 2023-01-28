import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { BaseButton } from '../../components/Button'
import { Input } from '../../components/Input'

const RegisterScreen = ({ navigation }) => {
  return (
    <>
      <View style={styles.container}>
        <Text>Create an account</Text>
        <Input></Input>
        <BaseButton
          title="Register"
          onPress={() => navigation.navigate('Pricing', { title: 'Jane' })}
        ></BaseButton>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'pink'
  }
})

export default RegisterScreen
