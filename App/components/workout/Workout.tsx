import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { WorkoutFormatted } from '../../../API/src/lib/types/workouts'
import Exercise from './Exercise'
import { BaseButton } from '../base/Button'
import dayjs from 'dayjs'
interface WorkoutProps {
  workout: WorkoutFormatted
}

const Workout = (props: WorkoutProps) => {
  const [timeNow, setTimeNow] = useState(new Date())
  const [startTime, setStartTime] = useState({})

  const [isTimerActive, setIsTimerActive] = useState(false)
  const handleStartTimer = () => {
    setIsTimerActive(true)
    const timerStartTime = dayjs(new Date().getTime() - timeNow.getTime())
    setStartTime(timerStartTime)
  }

  let timerInterval = null

  const handleInterval = (isRunning: Boolean) => {
    if (isRunning && !timerInterval) {
      timerInterval = setInterval(() => {
        const newTime = dayjs(startTime).add(1, 'second')

        const difference = dayjs(newTime).toDate().getTime() - timeNow.getTime()
        console.log('difference', dayjs().millisecond(difference).format('mm:ss'))
        setStartTime(dayjs().millisecond(difference))
      }, 1000)
    } else {
      console.log('falling into clear interval', timerInterval)
      clearInterval(timerInterval)
      timerInterval = null
    }
  }

  useEffect(() => {
    console.log('isTimer active', isTimerActive)

    if (isTimerActive) {
      if (Object.values(startTime).length) {
        handleInterval(true)
      }
    }
  }, [isTimerActive])

  const handleEndWorkout = () => {
    setIsTimerActive(false)
    setStartTime({})
    handleInterval(false)
  }
  const sets = [
    { workout: props.workout?.set1 ?? {}, set: 1 },
    { workout: props.workout?.set2, set: 2 },
    { workout: props.workout?.set3, set: 3 }
  ]
  return (
    <View style={{ marginVertical: 20 }}>
      <Text style={{ fontSize: 25, marginBottom: 20 }}>
        Workout:
        <Text style={{ fontWeight: '500' }}> {props.workout?.workoutName}</Text>
      </Text>

      {startTime && isTimerActive && <Text>{startTime.format('mm:ss')}</Text>}
      {!isTimerActive && <BaseButton text="Start workout" onPress={handleStartTimer}></BaseButton>}

      <View style={{ marginTop: 20 }}>
        {sets.map(set => (
          <View style={{ marginBottom: 10 }}>
            <Exercise exercise={set.workout} time={set.workout?.exerciseTime} set={set.set}></Exercise>
          </View>
        ))}
      </View>

      <BaseButton text="Complete timer" onPress={handleEndWorkout}></BaseButton>
    </View>
  )
}

const styles = StyleSheet.create({
  video: {
    width: 130,
    height: 80,
    backgroundColor: '#D9D9D9',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center'
  },
  description: {
    paddingLeft: 10,
    width: 230,
    justifyContent: 'space-between'
  },
  workoutContainer: {
    flexDirection: 'row'
  }
})
export default Workout
