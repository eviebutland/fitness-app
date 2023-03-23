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
import CompletedWorkout from '../components/dashboard/CompletedWorkout'

type Status = 'inactive' | 'active' | 'completed'

const DashboardScreen = ({ navigation }) => {
  const [todaysWorkout, setTodaysWorkout] = useRecoilState(todaysWorkoutState)
  const [isWorkoutInProgress, setIsWorkoutInProgress] = useState(false)
  const [status, setStatus] = useState<Status>('inactive')

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

      setStatus('inactive')
      setTodaysWorkout(data.workout)
    } catch (error) {
      console.log(error)
      navigation.navigate('Login')
    }
  }

  if (!workout) {
    fetchTodaysWorkout('today')
  }
  const handleDisplayWorkout = () => {
    setStatus('active')
  }

  const handleWorkoutStarted = () => {
    setIsWorkoutInProgress(true)
  }
  const handleCompleteWorkout = async () => {
    try {
      await axios.patch(`http://localhost:3030/users/${user.id}/completed-workout`, {
        workoutId: todaysWorkout?.id,
        name: todaysWorkout?.title
      })

      setIsWorkoutInProgress(false)
      setStatus('completed')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Container hasOverlay={!!activeModal.length}>
      <View>
        <Calendar
          initialDay={new Date()}
          handleSelectedDate={fetchTodaysWorkout}
          isDisabled={isWorkoutInProgress}
        ></Calendar>
        {status === 'inactive' && !!workout?.id && (
          <Overview handleDisplayWorkout={handleDisplayWorkout}></Overview>
        )}

        {status === 'active' && (
          <WorkoutDisplay
            handleCompleteWorkout={handleCompleteWorkout}
            handleWorkoutStarted={handleWorkoutStarted}
          ></WorkoutDisplay>
        )}

        {status === 'completed' && (
          <CompletedWorkout handleNavigateToDashboard={() => setStatus('inactive')}></CompletedWorkout>
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
