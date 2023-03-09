import React, { useState } from 'react'
import { View, Text, StyleSheet, Image, Button, Pressable } from 'react-native'
import { Container } from '../../components/base/Container'
import { ProgressBar } from '../../components/base/ProgressBar'
import { useRecoilValue } from 'recoil'
import { newUserGetter } from '../../state/register'
import { Title } from '../../components/base/Title'
import { Input } from '../../components/base/Input'
import { BaseButton } from '../../components/base/Button'
import { useForm, Controller } from 'react-hook-form'

interface FormData {
  activationCode: string | null
  password: string | null
}

const ConfirmationScreen = ({ navigation }) => {
  const newUser = useRecoilValue(newUserGetter)
  const [{ activationCode, password }, setActive] = useState({
    activationCode: null,
    password: null
  })

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

  const handleCompleteRegistration = (data: FormData) => {
    handleSubmit(() => {
      console.log(data)
      // 1. API call here to check activation code
      // 2. Update user with password
      // 3. Automatically log user in here
      // 4. Once logged in -> redirect
    })
    navigation.navigate('Entry')
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
              inputMode="text"
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

        <BaseButton text="Continue" onPress={() => handleCompleteRegistration()} />
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
