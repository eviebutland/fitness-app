import React, { useState } from 'react'
import { View, Text, StyleSheet, Image, Button, Pressable } from 'react-native'
import { Container } from '../../components/base/Container'
import { ProgressBar } from '../../components/base/ProgressBar'
import { useRecoilValue } from 'recoil'
import { newUserGetter } from '../../state/register'
import { Title } from '../../components/base/Title'
import { Input } from '../../components/base/Input'
import { BaseButton } from '../../components/base/Button'

const ConfirmationScreen = ({ navigation }) => {
  const newUser = useRecoilValue(newUserGetter)
  const [{ activationCode, password }, setActive] = useState({
    activationCode: null,
    password: null
  })

  const handleCompleteRegistration = () => {
    // 1. API call here to check activation code
    // 2. Update user with password
    // 3. Automatically log user in here
    // 4. Once logged in -> redirect
    navigation.navigate('Dashboard')
  }
  return (
    <Container footer={<ProgressBar percentage={100} />}>
      <View>
        <Title text={'Check your email'}></Title>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={require('../../assets/ladyIcon.png')}
            accessibilityLabel="App icon"
          />
        </View>

        <Text>
          {`Thank you for registering, we have sent an activation code to your email address: ${newUser.email}`}
        </Text>

        <Input
          onChangeText={e => setActive({ activationCode: e, password })}
          label="Activation code"
          value={activationCode}
          inputMode="text"
        />

        <Input
          onChangeText={e => setActive({ password: e, activationCode })}
          label="Activation code"
          value={password}
          inputMode="text"
        />

        <BaseButton text="Continue" onPress={handleCompleteRegistration} />
      </View>
    </Container>
  )
}

const styles = StyleSheet.create({
  imageContainer: {
    alignItems: 'center',
    marginBottom: 30
  },
  image: {
    height: 205,
    resizeMode: 'contain'
  }
})

export default ConfirmationScreen
