import React, { useEffect, useRef, useState } from 'react'
import { View, Text, StyleSheet, Image, ActivityIndicator } from 'react-native'
import { BaseButton } from '../../components/base/Button'
import { Title } from '../../components/base/Title'
import { useForm, Controller } from 'react-hook-form'
import { Input } from '../../components/base/Input'
import { Container } from '../../components/base/Container'
import axios from 'axios'
import ErrorSummary from '../../components/base/ErrorSummary'
import { useError } from '../../lib/useError'
import { fetchActivationCode, resetPassword } from '../../services/user'

interface FormData {
  username: string
  token: string
  password: string
}

const PasswordResetScreen = ({ navigation }) => {
  const { clearError, setError, error } = useError()
  const resetToken = useRef(null)
  const hasTriggeredToken = useRef(false)
  const [displayTokenField, setDisplayTokenField] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

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

  useEffect(() => {
    if (hasTriggeredToken.current) {
      setDisplayTokenField(true)
    }
  }, [hasTriggeredToken.current])

  const handleFetchActivationCode = async () => {
    setIsLoading(true)
    try {
      const { data } = await fetchActivationCode({
        email: control._formValues.username.toLowerCase(),
        method: 'reset'
      })

      resetToken.current = data.token
      console.log(data.token)
      hasTriggeredToken.current = true
    } catch (error) {
      setError({ name: 'Something went wrong', message: error?.response?.data?.message })
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSendResetPassword = async () => {
    setIsLoading(true)
    clearError()

    if (resetToken.current === parseInt(control._formValues.token)) {
      try {
        await resetPassword({
          email: control._formValues.username.toLowerCase(),
          newPassword: control._formValues.password
        })
        handleNavigate()
      } catch (error) {
        setError({ name: 'Something went wrong', message: error?.response?.data?.message })
      } finally {
        setIsLoading(false)
      }
    } else {
      setError({ name: 'Something went wrong', message: 'Activation code does not match' })
    }
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
        {!displayTokenField && (
          <BaseButton text="Get activation code" onPress={handleFetchActivationCode}></BaseButton>
        )}

        {displayTokenField && (
          <View>
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

            <Controller
              control={control}
              rules={{
                required: true
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  label="New Password"
                  value={value}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  inputMode="text"
                />
              )}
              name="password"
            />

            <BaseButton text="Send reset password link" onPress={handleSendResetPassword}></BaseButton>
          </View>
        )}

        {isLoading && (
          <View style={{ paddingTop: 20 }}>
            <ActivityIndicator />
          </View>
        )}

        {!!error && <ErrorSummary error={error}></ErrorSummary>}
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
