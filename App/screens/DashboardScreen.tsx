import React, { useEffect, useRef } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { useRecoilValue } from 'recoil'
import { userGetter } from '../state/user'
import { Title } from '../components/base/Title'
import { BaseButton } from '../components/base/Button'
import { Calendar } from '../components/calendar'
import axios from 'axios'

const DashboardScreen = ({ navigation }) => {
  const user = useRecoilValue(userGetter)

  const todaysWorkout = useRef([])
  const fetchTodaysWorkout = async () => {
    // API call to get todays workout
    try {
      const { data } = await axios.get('http://localhost:3030/workouts/today', {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      })

      todaysWorkout.current = data.workout.data
    } catch (error) {
      console.log(error)
    }
  }

  // useEffect(() => {
  //   console.log(todaysWorkout.current)
  // })
  fetchTodaysWorkout()

  const handleStartTimer = () => {
    console.log('start workout timer')
  }

  const handleCompleteWorkout = () => {
    // API call to set workout as completed
    // Update UI to show workout has been completed
  }
  return (
    <View>
      <Title text="Calendar"></Title>
      {/* Calendar on press fetches that day's workout  */}
      <Calendar></Calendar>
      {/* <Text>{todaysWorkout.current}</Text> */}
      <BaseButton text="Start workout" onPress={handleStartTimer}></BaseButton>
      <BaseButton text="Complete workout" onPress={handleCompleteWorkout}></BaseButton>
    </View>
  )
}

const styles = StyleSheet.create({
  icon: {
    backgroundColor: '#1B4332'
  }
})
export default DashboardScreen
