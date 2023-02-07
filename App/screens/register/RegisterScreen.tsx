import React, { useState } from 'react'
import { View, Image, StyleSheet } from 'react-native'
import { BaseButton } from '../../components/base/Button'
import { Container } from '../../components/base/Container'
import { Input } from '../../components/base/Input'
import { ProgressBar } from '../../components/base/ProgressBar'
import { Title } from '../../components/base/Title'

const RegisterScreen = ({ navigation, prop }) => {
  const [name, setName] = useState('')
  const [age, setAge] = useState(null)
  const [email, setEmail] = useState('')

  console.log(prop)
  return (
    <Container footer={<ProgressBar percentage={50} />}>
      <View>
        <View style={styles.imageContainer}>
          <Image source={require('../../assets/ladyIcon.png')} accessibilityLabel="App icon" />
        </View>

        <Title text={'Create an account'}></Title>

        <Input onChangeText={setName} label="Name" value={name} inputMode="text" />
        <Input onChangeText={setAge} label="Age" value={age} inputMode="numeric" />
        <Input onChangeText={setEmail} label="Email" value={email} inputMode="email" />

        <BaseButton text="Next step" onPress={() => navigation.navigate('Pricing')} />
      </View>
    </Container>
  )
}

const styles = StyleSheet.create({
  imageContainer: {
    display: 'flex',
    justifyContent: 'center',
    padding: 20
  }
})

export default RegisterScreen
