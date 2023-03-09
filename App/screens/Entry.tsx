import React from 'react'
import { View, Text, StyleSheet, Image, ActivityIndicator } from 'react-native'
import { useRecoilValue } from 'recoil'
import { BaseButton } from '../components/base/Button'
import { Container } from '../components/base/Container'
import { Title } from '../components/base/Title'
import { userGetter } from '../state/user'

const EntryScreen = ({ navigation }) => {
  const user = useRecoilValue(userGetter)

  setTimeout(() => {
    if (user?.name) {
      navigation.navigate('Dashboard')
    } else {
      navigation.navigate('Login')
    }
  }, 2000)
  return (
    <Container>
      <View>
        <View style={styles.titleContainer}>
          <Title styles={[{ ...styles.title }]} text={`Hi, ${user.name}`}></Title>
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
