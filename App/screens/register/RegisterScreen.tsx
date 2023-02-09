import React from 'react'
import { View, Image, StyleSheet } from 'react-native'
import { useRecoilState } from 'recoil'
import { BaseButton } from '../../components/base/Button'
import { Container } from '../../components/base/Container'
import { Input } from '../../components/base/Input'
import { ProgressBar } from '../../components/base/ProgressBar'
import { Title } from '../../components/base/Title'
import { newUserState } from '../../state/register'

const RegisterScreen = ({ navigation }) => {
  const [{ name, email, age }, setRegisterDetails] = useRecoilState(newUserState)

  return (
    <Container footer={<ProgressBar percentage={50} />}>
      <View>
        <View style={styles.imageContainer}>
          <Image source={require('../../assets/ladyIcon.png')} accessibilityLabel="App icon" />
        </View>

        <Title text={'Create an account'}></Title>

        <Input
          onChangeText={e => setRegisterDetails({ name: e, age, email })}
          label="Name"
          value={name}
          inputMode="text"
        />
        <Input
          onChangeText={e => setRegisterDetails({ age: e, name, email })}
          label="Age"
          value={age}
          inputMode="numeric"
        />
        <Input
          onChangeText={e => setRegisterDetails({ email: e, name, age })}
          label="Email"
          value={email}
          inputMode="email"
        />

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
