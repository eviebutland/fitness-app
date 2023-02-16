import React, { useState } from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import { useRecoilState, useRecoilValue } from 'recoil'
import { BaseButton } from '../../components/base/Button'
import { userState } from '../../state/user'
import { Input } from '../../components/base/Input'
import { Container } from '../../components/base/Container'
import axios from 'axios'

const LoginScreen = ({ navigation }) => {
  const [{ username, password }, setLoginDetails] = useState({ username: '', password: '' })
  const [user, setUser] = useRecoilState(userState)

  const handleLogin = async () => {
    console.log(username, password)

    try {
      const { data } = await axios.post('http://localhost:3030/login', {
        username: 'somehing@df.eesr',
        password: 'Password!23'
      })
      console.log(data)

      if (data.user) {
        setUser(data.user)
        navigation.navigate('Entry')
      }
    } catch (error) {
      console.log(error)
      // set an error message on screen
    }
  }

  const handleNavigate = (screen: string) => {
    navigation.navigate(screen)
  }
  return (
    <Container>
      <View>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={require('../../assets/ladyIcon.png')}
            accessibilityLabel="App icon"
          />
        </View>

        <Input
          onChangeText={e => setLoginDetails({ username: e, password })}
          label="Username or Email"
          value={username}
          inputMode="text"
        />

        <Input
          onChangeText={e => setLoginDetails({ password: e, username })}
          label="Password"
          value={password}
          inputMode="text"
        />

        <View style={styles.linkContainer}>
          <Text style={styles.link} onPress={handleNavigate('Register')}>
            Don't have an account?
          </Text>

          <Text style={styles.link} onPress={handleNavigate('ResetPassword')}>
            Reset password
          </Text>
        </View>

        <BaseButton text="Let's go!" onPress={handleLogin}></BaseButton>
      </View>
    </Container>
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
    resizeMode: 'contain',
    alignSelf: 'center'
  },
  linkContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  link: {
    display: 'flex',
    textDecorationLine: 'underline',
    marginBottom: 10
  }
})
