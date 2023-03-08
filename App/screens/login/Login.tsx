import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import { useRecoilState } from 'recoil'
import { BaseButton } from '../../components/base/Button'
import { userState } from '../../state/user'
import { Input } from '../../components/base/Input'
import { Container } from '../../components/base/Container'
import axios from 'axios'
import ErrorSummary from '../../components/base/ErrorSummary'

interface AxiosError {
  name: string
  message: string
}

const LoginScreen = ({ navigation }) => {
  const [{ username, password }, setLoginDetails] = useState({ username: '', password: '' })
  const [user, setUser] = useRecoilState(userState)
  const [error, setError] = useState<unknown | AxiosError>(null)

  const handleLogin = async () => {
    try {
      const { data } = await axios.post('http://localhost:3030/login', {
        username: 'somehing@df.eesr',
        password: 'Password!23'
      })

      if (data.user) {
        setUser(data.user)
        navigation.navigate('Entry')
      }
    } catch (error) {
      setError(error)
    }
  }

  useEffect(() => {
    if (error) {
      setError(null)
    }
  }, [username, password])

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
          <Text style={styles.link} onPress={() => handleNavigate('Register')}>
            Don't have an account?
          </Text>

          <Text style={styles.link} onPress={() => handleNavigate('ResetPassword')}>
            Reset password
          </Text>
        </View>

        <BaseButton text="Let's go!" onPress={handleLogin}></BaseButton>

        {!!error && <ErrorSummary error={error}></ErrorSummary>}
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
