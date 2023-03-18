import React, { useRef } from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import { useRecoilValue } from 'recoil'
import { BaseButton } from '../../components/base/Button'
import { Title } from '../../components/base/Title'
import { userGetter, userState } from '../../state/user'
import { useForm, Controller } from 'react-hook-form'
import { Input } from '../../components/base/Input'
import { Container } from '../../components/base/Container'
import axios from 'axios'

interface FormData {
  username: string
  token: string
  password: string
}

const PasswordResetScreen = ({ navigation }) => {
  const resetToken = useRef(null)
  const hasTriggeredToken = useRef(false)

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    defaultValues: {
      username: '',
      token: '',
      password: ''
    }
  })

  const fetchActivationCode = async () => {
    try {
      const { data } = await axios.patch('http://localhost:3030/users/activation', {
        email: control._formValues.username.toLowerCase(),
        method: 'reset'
      })

      resetToken.current = data.token
      console.log(data.token)
      hasTriggeredToken.current = true
    } catch (error) {
      console.log(error)
    }
  }
  const handleSendResetPassword = () => {
    // 1. send email via courier to reset password
    fetchActivationCode()

    if (resetToken.current === control._formValues.token) {
      console.log('send patch to user')
    }
    console.log('send reset password link')
    // 2. this will redirect them back to app,
    // 3. display the password input field
    // 4. log the user in automatically/ or redirect
  }
  const handleNavigate = () => {
    navigation.navigate('Login')
  }
  return (
    <Container>
      <View>
        <View style={styles.imageContainer}>
          <Image
            source={require('../../assets/ladyIcon.png')}
            style={styles.image}
            accessibilityLabel="App icon"
          />
        </View>
        <Title text="Reset password"></Title>

        <Controller
          control={control}
          rules={{
            required: true
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              label="Username or email address"
              value={value}
              onBlur={onBlur}
              onChangeText={onChange}
              inputMode="text"
            />
          )}
          name="username"
        />
        {errors.username && (
          <Text style={{ color: 'red', marginBottom: 10 }}>Username or email address is required</Text>
        )}
        <Text style={styles.link} onPress={handleNavigate}>
          or login
        </Text>

        {/* {!!hasTriggeredToken.current && ( */}
        <Controller
          control={control}
          rules={{
            required: true
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input label="Token" value={value} onBlur={onBlur} onChangeText={onChange} inputMode="text" />
          )}
          name="token"
        />
        {/* )} */}

        <BaseButton text="Send reset password link" onPress={handleSendResetPassword}></BaseButton>
      </View>
    </Container>
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
  },
  link: {
    display: 'flex',
    textDecorationLine: 'underline',
    marginBottom: 10
  }
})
