import React, { useEffect, useRef } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { useRecoilState, useRecoilValue } from 'recoil'
import { userGetter } from '../state/user'
import { Title } from '../components/base/Title'
import { BaseButton } from '../components/base/Button'
import { Calendar } from '../components/Calendar'
import axios from 'axios'
import { todaysWorkoutGetter, todaysWorkoutState } from '../state/workouts'
import Workout from '../components/workout/Workout'
import { Container } from '../components/base/Container'

const DashboardScreen = ({ navigation }) => {
  const user = useRecoilValue(userGetter)

  const [todaysWorkout, setTodaysWorkout] = useRecoilState(todaysWorkoutState)
  const workout = useRecoilValue(todaysWorkoutGetter)

  const today = new Date().toLocaleString('en-gb', { weekday: 'long' }).toLowerCase()
  const fetchTodaysWorkout = async (day: string) => {
    // API call to get todays workout
    let queryString = day
    if (day === 'today') {
      queryString = today
    }

    try {
      const { data } = await axios.get(`http://localhost:3030/workouts/day?day=${queryString}`, {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      })

      setTodaysWorkout(data.workout.data)
    } catch (error) {
      console.log(error)
    }
  }

  if (!workout.length) {
    fetchTodaysWorkout('today')
  }

  const handleCompleteWorkout = () => {
    // API call to set workout as completed
    // Update UI to show workout has been completed
  }

  return (
    <Container>
      <View>
        <Title text="Calendar"></Title>

        <Calendar initialDay={new Date()} handleSelectedDate={fetchTodaysWorkout}></Calendar>

        {typeof workout === 'string' ? (
          <Text>{workout}</Text>
        ) : (
          <View>
            <Workout workout={workout[0]}></Workout>

            <BaseButton text="Complete workout" onPress={handleCompleteWorkout}></BaseButton>
          </View>
        )}
      </View>
    </Container>
  )
}

const styles = StyleSheet.create({
  icon: {
    backgroundColor: '#1B4332'
  }
})
export default DashboardScreen
