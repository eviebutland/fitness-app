import React, { useState } from 'react'
import { View, Image, StyleSheet, ScrollView } from 'react-native'
import { BaseButton } from '../../components/base/Button'
import { Input } from '../../components/base/Input'
import { ProgressBar } from '../../components/base/ProgressBar'
import { Title } from '../../components/base/Title'

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState('')
  const [age, setAge] = useState(null)
  const [email, setEmail] = useState('')

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image source={require('../../assets/ladyIcon.png')} />
        </View>
        <Title title="Create an account"></Title>

        <Input onChangeText={setName} label="Name" value={name} inputMode="text"></Input>
        <Input onChangeText={setAge} label="Age" value={age} inputMode="numeric"></Input>
        <Input onChangeText={setEmail} label="Email" value={email} inputMode="email"></Input>

        <BaseButton
          title="Register"
          onPress={() => navigation.navigate('Pricing', { title: 'Jane' })}
        ></BaseButton>
      </View>

      <ProgressBar percentage={50}></ProgressBar>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 30
  },

  imageContainer: {
    display: 'flex',
    justifyContent: 'center',
    padding: 20
  }
})

export default RegisterScreen
