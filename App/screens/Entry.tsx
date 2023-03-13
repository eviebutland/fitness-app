import React from 'react'
import { View, Text, StyleSheet, Image, ActivityIndicator } from 'react-native'
import { useRecoilState } from 'recoil'
import { Container } from '../components/base/Container'
import { Title } from '../components/base/Title'
import { getData } from '../lib/async-storage/get-data'
import { userState } from '../state/user'
import axios from 'axios'
// import { removeData } from '../lib/async-storage/remove-data'

const EntryScreen = ({ navigation }) => {
  const [user, setUser] = useRecoilState(userState)

  const getStoredUser = async () => {
    const storedUser = await getData('userToken')

    if (storedUser?.email && storedUser?.password) {
      try {
        const { data } = await axios.post('http://localhost:3030/login', {
          username: storedUser?.email,
          password: storedUser?.password
        })

        if (data.user) {
          setUser(data.user)
          navigation.navigate('Dashboard')
        }
      } catch (error) {
        console.log(error)
      }
    } else {
      navigation.navigate('Login')
    }
  }

  if (!user.email) {
    getStoredUser()
  }
  // else {
  // console.log('removing data')
  // removeData('userToken')
  // }

  return (
    <Container>
      <View>
        <View style={styles.titleContainer}>
          <Title styles={[{ ...styles.title }]} text={'Fitness app'}></Title>
        </View>
        <Text style={styles.subtitle}>Are you ready for today's workout?</Text>
        <Image style={styles.image} source={require('../assets/entry.png')} accessibilityLabel="App icon" />
        <ActivityIndicator />
      </View>
    </Container>
  )
}

export default EntryScreen

const styles = StyleSheet.create({
  image: {
    height: 300,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginBottom: 20
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  icon: {
    backgroundColor: '#1B4332',
    height: 40,
    width: 40,
    borderRadius: 100
  },
  title: {
    paddingTop: 10,
    textAlign: 'left'
  },
  subtitle: {
    fontWeight: '500',
    fontSize: 20,
    marginBottom: 20
  }
})
