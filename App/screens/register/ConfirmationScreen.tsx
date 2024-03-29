import React, { useRef, useEffect } from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import { Container } from '../../components/base/Container'
import { ProgressBar } from '../../components/base/ProgressBar'
import { useRecoilValue } from 'recoil'
import { adminTokenGetter, newUserGetter } from '../../state/register'
import { Title } from '../../components/base/Title'
import { Input } from '../../components/base/Input'
import { BaseButton } from '../../components/base/Button'
import { useForm, Controller } from 'react-hook-form'
import axios from 'axios'
import { useError } from '../../lib/useError'
import { fetchActivationCode, updateUser } from '../../services/user'

interface FormData {
  activationCode: string | null
  password: string | null
}

const ConfirmationScreen = ({ navigation }) => {
  const newUser = useRecoilValue(newUserGetter)
  const activationCode = useRef(null)
  const userId = useRef(null)
  const hasTriggeredActivationEmail = useRef(false)
  const adminToken = useRecoilValue(adminTokenGetter)

  const { clearError, setError, error } = useError()

  const triggerActivationEmail = async () => {
    try {
      const { data } = await fetchActivationCode(
        {
          email: newUser.email as string,
          method: 'create'
        },
        adminToken
      )

      activationCode.current = data.token
      userId.current = data.id

      clearError()
    } catch (error) {
      setError({ name: 'Something went wrong', message: error?.response?.data?.message })
    } finally {
      hasTriggeredActivationEmail.current = true
    }
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

  useEffect(() => {
    if (!hasTriggeredActivationEmail.current) {
      triggerActivationEmail()
    }
  }, [hasTriggeredActivationEmail.current])

  const handleCompleteRegistration = async () => {
    if (activationCode.current === parseInt(control._formValues.activationCode)) {
      try {
        updateUser(userId.current, { password: control._formValues.password }, adminToken)

        clearError()

        navigation.navigate('Login')
      } catch (error) {
        setError({ name: 'Something went wrong', message: error?.response?.data?.message })
      }
    } else {
      setError({ name: 'Something went wrong', message: 'Your activation code does not match' })
    }
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
