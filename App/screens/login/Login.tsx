import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import { useRecoilState } from 'recoil'
import { BaseButton } from '../../components/base/Button'
import { userState } from '../../state/user'
import { Input } from '../../components/base/Input'
import { Container } from '../../components/base/Container'
import axios from 'axios'
import ErrorSummary from '../../components/base/ErrorSummary'
import { useForm, Controller } from 'react-hook-form'
import jwt from 'expo-jwt'
import { storeData } from '../../lib/async-storage/store-data'

interface AxiosError {
  name: string | null
  message: string | null
}

type FormData = {
  username: string
  password: string
}

const LoginScreen = ({ navigation }) => {
  const [user, setUser] = useRecoilState(userState)
  const [error, setError] = useState<AxiosError>({ name: null, message: null })
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    defaultValues: {
      username: '',
      password: ''
    }
  })

  const handleLogin = async (formData: FormData) => {
    try {
      const { data } = await axios.post('http://localhost:3030/login', {
        username: 'somehing@df.eesr',
        password: 'Password!23'
      })

      if (data.user) {
        const userToken = jwt.decode(data.user.token, 'secret')
        const jsonUserToken = JSON.stringify(userToken)

        storeData('userToken', jsonUserToken)
        setUser(data.user)

        navigation.navigate('Dashboard')
      }
    } catch (error) {
      setError({ name: 'Something went wrong', message: error?.response?.data?.message })
    }
  }

  useEffect(() => {
    if (error.name) {
      setError({
        name: null,
        message: null
      })
    }
  }, [control._formValues.username, control._formValues.password])

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

        <Controller
          control={control}
          rules={{
            required: true
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              label="Username or Email"
              value={value}
              onBlur={onBlur}
              onChangeText={onChange}
              inputMode="text"
            />
          )}
          name="username"
        />
        {errors.username && <Text style={{ color: 'red', marginBottom: 10 }}>Username is required</Text>}

        <Controller
          control={control}
          rules={{
            required: true
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input label="Password" value={value} onBlur={onBlur} onChangeText={onChange} inputMode="text" />
          )}
          name="password"
        />
        {errors.password && <Text style={{ color: 'red', marginBottom: 10 }}>Password is required</Text>}

        <View style={styles.linkContainer}>
          <Text style={styles.link} onPress={() => handleNavigate('Register')}>
            Don't have an account?
          </Text>

          <Text style={styles.link} onPress={() => handleNavigate('ResetPassword')}>
            Reset password
          </Text>
        </View>

        <BaseButton
          isDisabled={!!Object.values(errors).length}
          text="Let's go!"
          onPress={handleSubmit(handleLogin)}
        ></BaseButton>

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
