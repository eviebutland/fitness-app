import React, { useState } from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import { useRecoilState, useRecoilValue } from 'recoil'
import { userGetter } from '../state/user'
import { Calendar } from '../components/Calendar'
import axios from 'axios'
import { todaysWorkoutGetter, todaysWorkoutState } from '../state/workouts'
import { Container } from '../components/base/Container'
import { activeModalGetter } from '../state/modal'
import WorkoutDisplay from '../components/dashboard/WorkoutDisplay'
import Overview from '../components/dashboard/Overview'

const DashboardScreen = ({ navigation }) => {
  const [todaysWorkout, setTodaysWorkout] = useRecoilState(todaysWorkoutState)
  const [isWorkoutInProgress, setIsWorkoutInProgress] = useState(false)
  const [shouldDisplayWorkout, setShouldDisplayWorkout] = useState(false)

  const user = useRecoilValue(userGetter)
  const activeModal = useRecoilValue(activeModalGetter)
  const workout = useRecoilValue(todaysWorkoutGetter)

  const today = new Date().toLocaleString('en-gb', { weekday: 'long' }).toLowerCase()
  const fetchTodaysWorkout = async (day: string) => {
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

      setShouldDisplayWorkout(false)
      setTodaysWorkout(data.workout.data)
    } catch (error) {
      console.log(error)
      navigation.navigate('Login')
    }
  }

  if (!workout.length) {
    fetchTodaysWorkout('today')
  }
  const handleDisplayWorkout = () => {
    console.log('dsplay tje wprkout')
    setShouldDisplayWorkout(true)
  }

  const handleWorkoutStarted = () => {
    setIsWorkoutInProgress(true)
  }
  const handleCompleteWorkout = () => {
    setIsWorkoutInProgress(false)
  }

  return (
    <Container hasOverlay={!!activeModal.length}>
      <View>
        <Calendar
          initialDay={new Date()}
          handleSelectedDate={fetchTodaysWorkout}
          isDisabled={isWorkoutInProgress}
        ></Calendar>
        {!shouldDisplayWorkout && workout.length > 0 && (
          <Overview handleDisplayWorkout={handleDisplayWorkout}></Overview>
        )}

        {shouldDisplayWorkout && (
          <WorkoutDisplay
            handleCompleteWorkout={() => handleCompleteWorkout}
            handleWorkoutStarted={() => handleWorkoutStarted}
          ></WorkoutDisplay>
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
