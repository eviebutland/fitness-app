import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import { useRecoilValue } from 'recoil'
import { BaseButton } from '../../components/base/Button'
import { Title } from '../../components/base/Title'
import { userState } from '../../state/user'
import { useForm, Controller } from 'react-hook-form'
import { Input } from '../../components/base/Input'
import { Container } from '../../components/base/Container'
interface FormData {
  username: string
  password: string
}
const PasswordResetScreen = ({ navigation }) => {
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

  const handleSendResetPassword = () => {
    console.log('send reset password link')
    // 1. send email via oauth2 to reset password
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
