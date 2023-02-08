import React, { useState } from 'react'
import { View, Image, StyleSheet } from 'react-native'
import { useSetRecoilState, useRecoilState } from 'recoil'
import { BaseButton } from '../../components/base/Button'
import { Container } from '../../components/base/Container'
import { Input } from '../../components/base/Input'
import { ProgressBar } from '../../components/base/ProgressBar'
import { Title } from '../../components/base/Title'
import { newUserState } from '../../state/register'

const RegisterScreen = ({ navigation }) => {
  const [newUser, setNewUser] = useRecoilState(newUserState)
  // const setNewUser = useSetRecoilState(newUserState) //  Using useSetRecoilState() allows a component
  // to set the value without subscribing the component to re-render when the value changes

  const [registerDetails, setRegisterDetails] = useState({})
  const [email, setEmail] = useState('')
  console.log('new user', newUser)

  console.log(registerDetails)
  const handleSubmit = () => {
    navigation.navigate('Pricing')
  }

  // const handleInputChange = value => {
  //   console.log(value)
  //   setRegisterDetails({
  //     name: value.name
  //   })
  // }
  return (
    <Container footer={<ProgressBar percentage={50} />}>
      <View>
        <View style={styles.imageContainer}>
          <Image source={require('../../assets/ladyIcon.png')} accessibilityLabel="App icon" />
        </View>

        <Title text={'Create an account'}></Title>

        {/* <Input
          onChangeText={handleInputChange}
          label="Name"
          value={{ name: registerDetails.name }}
          inputMode="text"
        /> */}
        <Input onChangeText={setNewUser} label="Age" value={newUser.age} inputMode="numeric" />
        <Input onChangeText={setEmail} label="Email" value={email} inputMode="email" />

        <BaseButton text="Next step" onPress={handleSubmit} />
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
