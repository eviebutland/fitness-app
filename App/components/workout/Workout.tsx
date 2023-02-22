import React, { useEffect, useState, useRef } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { WorkoutFormatted } from '../../../API/src/lib/types/workouts'
import Exercise from './Exercise'
import { BaseButton } from '../base/Button'
import dayjs from 'dayjs'
interface WorkoutProps {
  workout: WorkoutFormatted
  onCompleteWorkout: Function
}

const Workout = (props: WorkoutProps) => {
  const [timeNow, setTimeNow] = useState(new Date())
  const [startTime, setStartTime] = useState({})
  const [isTimerActive, setIsTimerActive] = useState(false)
  const intervalRef = useRef(null)

  const handleStartTimer = () => {
    setTimeNow(new Date())
    setIsTimerActive(true)
    setStartTime(dayjs(new Date(0)))
  }

  // Move this functionality out to tidy up
  const handleInterval = (isRunning: Boolean) => {
    if (isRunning && !intervalRef.current) {
      intervalRef.current = setInterval(() => {
        const newTime = dayjs(startTime).add(1, 'second')

        const difference = dayjs(newTime).toDate().getTime() - timeNow.getTime()
        setStartTime(dayjs().millisecond(difference))
      }, 1000)
    } else {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }
  // Move this functionality out to tidy up
  useEffect(() => {
    if (isTimerActive) {
      if (Object.values(startTime).length) {
        handleInterval(true)
      }
    }
  }, [isTimerActive])

  const handleEndWorkout = () => {
    setIsTimerActive(false)
    handleInterval(false)
    // call API
    props.onCompleteWorkout()
  }
  const sets = [
    { workout: props.workout?.set1 ?? {}, set: 1 },
    { workout: props.workout?.set2, set: 2 },
    { workout: props.workout?.set3, set: 3 }
  ]
  return (
    <View style={{ marginVertical: 20 }}>
      <Text style={{ fontSize: 25 }}>
        Workout:
        <Text style={{ fontWeight: '500' }}> {props.workout?.workoutName}</Text>
      </Text>

      {!isTimerActive && (
        <View style={{ marginTop: 20 }}>
          <BaseButton text="Start workout" onPress={handleStartTimer}></BaseButton>
        </View>
      )}

      {/* TODO: update these to come from API */}
      <View style={{ marginVertical: 20 }}>
        <Text style={{ marginBottom: 10 }}>Warm up</Text>
        <View style={{ marginLeft: 10 }}>
          <Text>Incline walk 10 mins</Text>
          <Text>Hip openers</Text>
          <Text>Deep sumo squat shifts</Text>
        </View>
      </View>

      {startTime && isTimerActive && (
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontSize: 40, fontWeight: '500' }}>{startTime.format('mm:ss')}</Text>
        </View>
      )}

      <View style={{ marginTop: 20 }}>
        {sets.map(set => (
          <View style={{ marginBottom: 10 }}>
            <Exercise exercise={set.workout} time={set.workout?.exerciseTime} set={set.set}></Exercise>
          </View>
        ))}
      </View>

      {/* TODO: update these to come from API */}
      <View style={{ marginBottom: 20 }}>
        <Text style={{ marginBottom: 10 }}>Cool down</Text>
        <View style={{ marginLeft: 10 }}>
          <Text>Incline walk 5 mins</Text>
          <Text>Pigeon static stretch</Text>
          <Text>Hamstring stretch</Text>
        </View>
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
