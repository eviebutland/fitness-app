import React, { useRef } from 'react'
import { View, Image, StyleSheet, Text } from 'react-native'
import { BaseButton } from '../../components/base/Button'
import { Container } from '../../components/base/Container'
import { Input } from '../../components/base/Input'
import { ProgressBar } from '../../components/base/ProgressBar'
import { Title } from '../../components/base/Title'
import { useForm, Controller } from 'react-hook-form'
import { useRecoilState } from 'recoil'
import { newUserState } from '../../state/register'
import { fetchActivationCode, userLogin } from '../../services/user'
import { userState } from '../../state/user'
import { removeData } from '../../lib/async-storage/remove-data'
import { storeData } from '../../lib/async-storage/store-data'
import jwt from 'expo-jwt'
interface FormData {
  name: string
  age: number | null
  email: string
}
const RegisterScreen = ({ navigation }) => {
  const [registerDetails, setRegisterDetails] = useRecoilState(newUserState)
  // const [user, setUser] = useRecoilState(userState)
  const user = useRef('')
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    defaultValues: {
      name: '',
      age: null,
      email: ''
    }
  })

  // TODO REMOVE THIS FROM THIS PAGE
  const loginAsAdmin = async () => {
    // isLoading.current = true
    removeData('userToken')

    // console.log(process.env.ADMIN_USERNAME)
    try {
      const { data } = await userLogin({
        username: 'admin@0990.com',
        password: 'Password!23'
      })

      if (data.user) {
        user.current = data.user.token
      }
      console.log(data)
    } catch (error) {
      console.log(error)
      // setError({ name: 'Something went wrong', message: error?.response?.data?.message })
    } finally {
      // isLoading.current = false
    }
  }

  const handleContinue = async () => {
    await loginAsAdmin()

    console.log('user', user.current)
    const { data } = await fetchActivationCode(
      {
        email: control._formValues.email.toLowerCase() as string,
        method: 'create'
      },
      user.current
    )

    console.log('data', data)
    const userDetails = {
      ...control._formValues,
      email: control._formValues.email.toLowerCase()
    }

    setRegisterDetails({ ...registerDetails, ...userDetails })

    if (!Object.values(errors).length) {
      navigation.navigate('Pricing')
    }
  }
  return (
    <Container footer={<ProgressBar percentage={50} />}>
      <View>
        <View style={styles.imageContainer}>
          <Image
            source={require('../../assets/ladyIcon.png')}
            style={styles.image}
            accessibilityLabel="App icon"
          />
        </View>

        <Title text={'Create an account'}></Title>

        <Controller
          control={control}
          rules={{
            required: true
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input label="Name" value={value} onBlur={onBlur} onChangeText={onChange} inputMode="text" />
          )}
          name="name"
        />
        {errors.name && <Text style={{ color: 'red', marginBottom: 10 }}>Name is required</Text>}

        <Controller
          control={control}
          rules={{
            required: true,
            min: 12
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input label="Age" value={value} onBlur={onBlur} onChangeText={onChange} inputMode="numeric" />
          )}
          name="age"
        />
        {errors.age && <Text style={{ color: 'red', marginBottom: 10 }}>Age is required</Text>}

        <Controller
          control={control}
          rules={{
            required: true,
            min: 12
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input label="Email" value={value} onBlur={onBlur} onChangeText={onChange} inputMode="email" />
          )}
          name="email"
        />
        {errors.email && <Text style={{ color: 'red', marginBottom: 10 }}>Email is required</Text>}

        <BaseButton isDisabled={!!Object.values(errors).length} text="Next step" onPress={handleContinue} />
      </View>
    </Container>
  )
}

const styles = StyleSheet.create({
  imageContainer: {
    display: 'flex',
    justifyContent: 'center',
    padding: 20
  },
  image: {
    height: 195,
    resizeMode: 'contain',
    alignSelf: 'center'
  }
})

export default RegisterScreen
