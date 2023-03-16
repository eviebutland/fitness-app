import React, { useRef, useState } from 'react'
import { View, Text, StyleSheet, Image, Button, Pressable } from 'react-native'
import { Container } from '../../components/base/Container'
import { ProgressBar } from '../../components/base/ProgressBar'
import { useRecoilValue } from 'recoil'
import { newUserGetter } from '../../state/register'
import { Title } from '../../components/base/Title'
import { Input } from '../../components/base/Input'
import { BaseButton } from '../../components/base/Button'
import { useForm, Controller } from 'react-hook-form'
import axios from 'axios'
import { useError } from '../../lib/useError'

interface FormData {
  activationCode: string | null
  password: string | null
}

const ConfirmationScreen = ({ navigation }) => {
  const newUser = useRecoilValue(newUserGetter)
  const activationCode = useRef(null)
  const userId = useRef(null)
  const hasTriggeredActivationEmail = useRef(false)

  const { clearError, setError, error } = useError()

  console.log(newUser)

  const triggerActivationEmail = async () => {
    hasTriggeredActivationEmail.current = true

    console.log('falling into trigger')
    // try {
    //   const { data } = await axios.patch('http://localhost:3030/users/activation', { email: newUser.email })
    //   console.log(data.token)
    //   activationCode.current = data.token
    //   userId.current = data.id

    //   clearError()
    // } catch (error) {
    //   setError({ name: 'Something went wrong', message: error?.response?.data?.message })
    // }
  }

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    defaultValues: {
      activationCode: null,
      password: null
    }
  })

  if (!hasTriggeredActivationEmail) {
    triggerActivationEmail()
  }

  const handleCompleteRegistration = async () => {
    // check this against input field

    if (activationCode.current === parseInt(control._formValues.activationCode)) {
      console.log('calling patch now')
      try {
        // call endpoint to update password and set user to active
        const { data } = await axios.patch(`http://localhost:3030/users/${userId.current}`, {
          password: control._formValues.password
        })

        console.log(data)
        clearError()
        navigation.navigate('Entry')
      } catch (error) {
        setError({ name: 'Something went wrong', message: error?.response?.data?.message })
      }
    } else {
      setError({ name: 'Something went wrong', message: 'Your activation code does not match' })
    }

    // navigation.navigate('Entry')
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

        <Controller
          control={control}
          rules={{
            required: true,
            min: 12
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              label="Activation code"
              value={value}
              onBlur={onBlur}
              onChangeText={onChange}
              inputMode="numeric"
            />
          )}
          name="activationCode"
        />
        {errors.activationCode && (
          <Text style={{ color: 'red', marginBottom: 10 }}>Activation code is required</Text>
        )}

        <Controller
          control={control}
          rules={{
            required: true,
            min: 12
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              value={value}
              onBlur={onBlur}
              onChangeText={onChange}
              label="Create password"
              inputMode="text"
            />
          )}
          name="password"
        />
        {errors.password && <Text style={{ color: 'red', marginBottom: 10 }}>Password is required</Text>}

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
