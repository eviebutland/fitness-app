import { View, Text, Image } from 'react-native'
import React from 'react'

const CompletedWorkout = () => {
  const completedWorkoutStats = [] // get these from state?
  return (
    <View style={{ marginTop: 40 }}>
      <Text style={{ fontSize: 25, fontWeight: '600', textAlign: 'center' }}>Workout completed!</Text>

      <View></View>

      <Image
        style={{ width: '90%', justifyContent: 'center' }}
        source={require('../../assets/rest.png')}
        accessibilityLabel="App icon"
      />
    </View>
  )
}

export default CompletedWorkout
