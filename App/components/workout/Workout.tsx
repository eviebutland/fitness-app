import React, { useEffect, useState, useRef } from 'react'
import { View, Text } from 'react-native'
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

const orderedWorkout = {
  warmUp: {
    label: 'Warm up',
    value: null
  },
  superset: {
    label: 'Superset',
    value: null
  },
  wod: {
    label: 'WOD',
    value: null
  },
  additionalTopUp: {
    label: 'Additional top up',
    value: null
  },
  finisher: {
    label: 'Finisher',
    value: null
  },
  cooldown: {
    label: 'Cool down',
    value: null
  }
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

  Object.entries(props.workout.workout).forEach(([key, value]) => {
    orderedWorkout[key] = { ...orderedWorkout[key], value }
  })

  return (
    <View style={{ marginVertical: 20 }}>
      <Text style={{ fontSize: 25 }}>
        Workout:
        <Text style={{ fontWeight: '500' }}> {props.workout?.title}</Text>
        {props.hasCompletedWorkout && <FontAwesomeIcon icon={faCheckCircle} color={'#52B788'} />}
      </Text>

      {!isTimerActive && (
        <View style={{ marginTop: 20 }}>
          <BaseButton text="Start workout" onPress={handleStartTimer}></BaseButton>
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
        {Object.entries(orderedWorkout).map(([key, workout]) => (
          <View>
            <Text style={{ fontWeight: 'bold' }}>{workout.label}</Text>
            <View style={{ marginVertical: 20 }}>
              {workout.value &&
                workout.value.map((set, index) => (
                  <View style={{ marginBottom: 10 }}>
                    <Exercise exercise={set} groupIndex={index} set={key}></Exercise>
                  </View>
                ))}
            </View>
          </View>
        ))}
      </View>

      <BaseButton text="Complete workout" onPress={handleEndWorkout}></BaseButton>
    </View>
  )
}

export default Workout
