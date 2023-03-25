import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCheckCircle, faClock, faDumbbell } from '@fortawesome/free-solid-svg-icons'
import { BaseButton } from '../base/Button'

interface CompletedWorkoutProps {
  handleNavigateToDashboard: Function
}

const CompletedWorkout = (props: CompletedWorkoutProps) => {
  const completedWorkoutStats = [] // get these from state?
  return (
    <View style={{ marginTop: 40 }}>
      <Text style={{ fontSize: 25, fontWeight: '600', textAlign: 'center' }}>Workout completed!</Text>

      <View style={{ justifyContent: 'space-around', flexDirection: 'row', marginVertical: 10 }}>
        <View style={styles.box}>
          <FontAwesomeIcon
            icon={faClock}
            color={'#52B788'}
            style={{ marginBottom: 10 }}
            size={35}
          ></FontAwesomeIcon>
          <Text style={{ fontSize: 20, fontWeight: '600' }}>33:00</Text>
        </View>
        <View style={styles.box}>
          <FontAwesomeIcon
            icon={faCheckCircle}
            color={'#52B788'}
            style={{ marginBottom: 10 }}
            size={35}
          ></FontAwesomeIcon>
          <Text style={{ fontSize: 20, fontWeight: '600' }}>Full body</Text>
        </View>
        <View style={styles.box}>
          <FontAwesomeIcon
            icon={faDumbbell}
            color={'#52B788'}
            style={{ marginBottom: 10 }}
            size={35}
          ></FontAwesomeIcon>
          <Text style={{ fontSize: 20, fontWeight: '600' }}>120 reps</Text>
        </View>
      </View>

      <Image
        style={{ width: 250, justifyContent: 'center', alignSelf: 'center', height: 350 }}
        source={require('../../assets/rest.png')}
        accessibilityLabel="App icon"
      />

      <BaseButton text="Go to dashboard" onPress={props.handleNavigateToDashboard}></BaseButton>
    </View>
  )
}

export default CompletedWorkout

const styles = StyleSheet.create({
  box: {
    backgroundColor: '#B7E4C7',
    borderRadius: 5,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
