import React, { useEffect, useState } from 'react'
import { ScrollView, View, Text } from 'react-native'
import { Pedometer } from 'expo-sensors'

export const StepCounter = () => {
  const [currentStepCount, setCurrentStepCount] = useState(0)

  const subscribe = async () => {
    const isAvailable = await Pedometer.isAvailableAsync()

    if (isAvailable) {
      return Pedometer.watchStepCount(result => {
        setCurrentStepCount(result.steps)
      })
    }
  }

  useEffect(() => {
    console.log('is running')
    const subscription = subscribe()
    return () => subscription && subscription.remove()
  }, [])

  return (
    <ScrollView>
      <View>
        <Text>Walk! And watch this go up: {currentStepCount}</Text>
      </View>
    </ScrollView>
  )
}
