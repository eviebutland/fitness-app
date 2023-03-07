import React, { useState } from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import { useRecoilState, useRecoilValue } from 'recoil'
import { userGetter } from '../state/user'
import { Calendar } from '../components/Calendar'
import axios from 'axios'
import { todaysWorkoutGetter, todaysWorkoutState } from '../state/workouts'
import Workout from '../components/workout/Workout'
import { Container } from '../components/base/Container'
import { activeModalGetter } from '../state/modal'

const DashboardScreen = ({ navigation }) => {
  const [todaysWorkout, setTodaysWorkout] = useRecoilState(todaysWorkoutState)
  const [isWorkoutInProgress, setIsWorkoutInProgress] = useState(false)

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

      setTodaysWorkout(data.workout.data)
    } catch (error) {
      console.log(error)
      navigation.navigate('Login')
    }
  }

  if (!workout.length) {
    fetchTodaysWorkout('today')
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
        {typeof workout === 'string' && workout === 'REST' ? (
          <View style={{ justifyContent: 'flex-start', paddingVertical: 30 }}>
            <Text style={{ fontSize: 25, fontWeight: 'bold' }}>Relax,</Text>
            <Text style={{ fontSize: 25 }}>You've got a rest day</Text>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <Image
                style={{ width: '90%', justifyContent: 'center' }}
                source={require('../assets/rest.png')}
                accessibilityLabel="App icon"
              />
            </View>
          </View>
        ) : (
          workout[0] && (
            <Workout
              workout={workout[0]}
              onCompleteWorkout={handleCompleteWorkout}
              isWorkoutCompleted={false}
              onWorkoutStart={handleWorkoutStarted}
            ></Workout>
          )
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
