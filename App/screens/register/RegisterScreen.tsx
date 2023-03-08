import React from 'react'
import { View, Image, StyleSheet, Text } from 'react-native'
import { useRecoilState } from 'recoil'
import { BaseButton } from '../../components/base/Button'
import { Container } from '../../components/base/Container'
import { Input } from '../../components/base/Input'
import { ProgressBar } from '../../components/base/ProgressBar'
import { Title } from '../../components/base/Title'
import { newUserState } from '../../state/register'
import { useForm, Controller } from 'react-hook-form'

interface FormData {
  name: string
  age: number | null
  email: string
}
const RegisterScreen = ({ navigation }) => {
  const [{ name, email, age }, setRegisterDetails] = useRecoilState(newUserState)
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

  const handleContinue = data => {
    handleSubmit(() => console.log(data))
    if (!Object.values(errors).length) {
      navigation.navigate('Pricing')
    }
  }
  return (
    <Container footer={<ProgressBar percentage={50} />}>
      <View>
        <View style={styles.imageContainer}>
          <Image source={require('../../assets/ladyIcon.png')} accessibilityLabel="App icon" />
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
  }
})

export default RegisterScreen
