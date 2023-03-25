import React, { useState } from 'react'
import { View, StyleSheet, ActivityIndicator } from 'react-native'
import { useRecoilState, useRecoilValue } from 'recoil'
import { userState } from '../state/user'
import { Calendar } from '../components/Calendar'

import { completedWorkoutState, todaysWorkoutGetter, todaysWorkoutState } from '../state/workouts'
import { Container } from '../components/base/Container'
import { activeModalGetter } from '../state/modal'
import WorkoutDisplay from '../components/dashboard/WorkoutDisplay'
import Overview from '../components/dashboard/Overview'
import CompletedWorkout from '../components/dashboard/CompletedWorkout'
import { fetchUser, updatedCompletedWorkouts } from '../services/user'

import { fetchWorkoutOfTheDay } from '../services/workout'
type Status = 'inactive' | 'active' | 'completed'

const DashboardScreen = ({ navigation }) => {
  const [todaysWorkout, setTodaysWorkout] = useRecoilState(todaysWorkoutState)
  const [user, setUser] = useRecoilState(userState)
  const [_, setCompletedWorkout] = useRecoilState(completedWorkoutState)

  const activeModal = useRecoilValue(activeModalGetter)
  const workout = useRecoilValue(todaysWorkoutGetter)

  const [isWorkoutInProgress, setIsWorkoutInProgress] = useState(false)
  const [status, setStatus] = useState<Status>('inactive')
  const [isLoading, setIsLoading] = useState(false)
  const [selectedDay, setSelectedDay] = useState('today')

  const today = new Date().toLocaleString('en-gb', { weekday: 'long' }).toLowerCase()

  const fetchTodaysWorkout = async (day: string) => {
    let queryString = day

    setIsLoading(true)
    if (day === 'today') {
      queryString = today
    }
    setSelectedDay(queryString)

    try {
      const { data } = await fetchWorkoutOfTheDay(user.token as string, queryString)

      setStatus('inactive')
      setTodaysWorkout(data.workout)
    } catch (error) {
      console.log(error)
      navigation.navigate('Login')
    } finally {
      setIsLoading(false)
    }
  }

  if (!workout) {
    fetchTodaysWorkout('today')
  }

  const handleCompleteWorkout = async () => {
    try {
      await updatedCompletedWorkouts(user, {
        workoutId: todaysWorkout?.id,
        name: todaysWorkout?.title
      })

      setIsWorkoutInProgress(false)
      setStatus('completed')

      fetchUser(user, data => {
        setUser(data.data)
      })
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

        {isLoading ? (
          <ActivityIndicator></ActivityIndicator>
        ) : (
          <View>
            {status === 'inactive' && !!workout?.id && (
              <Overview handleDisplayWorkout={() => setStatus('active')} selectedDay={selectedDay}></Overview>
            )}

            {status === 'active' && (
              <WorkoutDisplay
                handleCompleteWorkout={handleCompleteWorkout}
                handleWorkoutStarted={() => {
                  setIsWorkoutInProgress(true)
                  setCompletedWorkout({ time: '', reps: 0, name: '' })
                }}
              ></WorkoutDisplay>
            )}

            {status === 'completed' && (
              <CompletedWorkout
                handleNavigateToDashboard={() => {
                  setStatus('inactive')
                }}
              ></CompletedWorkout>
            )}
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
