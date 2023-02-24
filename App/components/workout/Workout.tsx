import React, { useEffect, useState, useRef } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { WorkoutFormatted } from '../../../API/src/lib/types/workouts'
import Exercise from './Exercise'
import { BaseButton } from '../base/Button'
import { useTimer } from '../../lib/useTimer'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'

interface WorkoutProps {
  workout: WorkoutFormatted
  onCompleteWorkout: Function
  hasCompletedWorkout: Boolean
}

const Workout = (props: WorkoutProps) => {
  const { handleInterval, handleStartTimer, startTime, handleEndTimer, isTimerActive } = useTimer()

  useEffect(() => {
    if (isTimerActive) {
      if (Object.values(startTime).length) {
        handleInterval(true)
      }
    }
  }, [isTimerActive])

  const handleEndWorkout = () => {
    handleEndTimer()

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
        {props.hasCompletedWorkout && <FontAwesomeIcon icon={faCheckCircle} color={'#52B788'} />}
      </Text>

      {!isTimerActive && (
        <View style={{ marginTop: 20 }}>
          <BaseButton text="Start workout" onPress={handleStartTimer}></BaseButton>
        </View>
      )}

      {props.workout?.warmup.length && (
        <View style={{ marginVertical: 20 }}>
          <Text style={{ marginBottom: 10 }}>Warm up</Text>
          <View style={{ marginLeft: 10 }}>
            {props.workout.warmup.map(warmup => (
              <Text>{warmup}</Text>
            ))}
          </View>
        </View>
      )}

      {startTime && isTimerActive && (
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Text onPress={handleEndTimer} style={{ fontSize: 40, fontWeight: '500' }}>
            {startTime.format('mm:ss')}
          </Text>
        </View>
      )}

      <View style={{ marginTop: 20 }}>
        {sets.map((set, index) => (
          <View style={{ marginBottom: 10 }} key={index}>
            <Exercise
              exercise={set.workout}
              time={set.workout?.exerciseTime}
              reps={set.workout?.recommededRepRange}
              set={set.set}
            ></Exercise>
          </View>
        ))}
      </View>

      {props.workout?.cooldown.length && (
        <View style={{ marginBottom: 20 }}>
          <Text style={{ marginBottom: 10 }}>Cool down</Text>
          <View style={{ marginLeft: 10 }}>
            {props.workout.cooldown.map(cooldown => (
              <Text>{cooldown}</Text>
            ))}
          </View>
        </View>
      )}

      <BaseButton text="Complete workout" onPress={handleEndWorkout}></BaseButton>
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
