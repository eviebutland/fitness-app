import React, { useEffect } from 'react'
import { View, Text, ScrollView } from 'react-native'
import { WorkoutFormatted, WorkoutJSONB } from '../../../API/src/lib/types/workouts'
import Exercise from './Exercise'
import { BaseButton } from '../base/Button'
import { useTimer } from '../../lib/useTimer'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { ExerciseJSONB } from '../../../API/src/lib/types/workouts'
import { capitaliseFirstLetter } from '../../lib/utility/string'
import { useRecoilState, useRecoilValue } from 'recoil'
import { completedWorkoutState, recordedRepsGetter } from '../../state/workouts'
import { Dayjs } from 'dayjs'

interface WorkoutProps {
  workout: WorkoutFormatted
  onCompleteWorkout: Function
  isWorkoutCompleted: Boolean
  onWorkoutStart: Function
}

interface OrderedWorkout {
  [key: string]: {
    label: string
    value: null | Array<ExerciseJSONB>
  }
}

let orderedWorkout: OrderedWorkout = {
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
  circuit: {
    label: 'Circuit',
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
  const [_, setCompletedWorkout] = useRecoilState(completedWorkoutState)
  const recordedReps = useRecoilValue(recordedRepsGetter)

  useEffect(() => {
    if (isTimerActive) {
      if (Object.values(startTime).length) {
        handleInterval(true)
      }
    }
  }, [isTimerActive])

  const handleEndWorkout = () => {
    setCompletedWorkout({
      reps: recordedReps,
      time: Object.values(startTime).length && startTime?.format('mm:ss') ? startTime?.format('mm:ss') : '0',
      name: props.workout?.title as string
    })

    handleEndTimer()
    props.onCompleteWorkout()
  }

  const handleStartWorkout = () => {
    props.onWorkoutStart()
    handleStartTimer()
  }

  Object.entries(props.workout?.workout as WorkoutJSONB).forEach(([key, value]) => {
    orderedWorkout[key] = { ...orderedWorkout[key], value }
  })

  orderedWorkout = Object.fromEntries(Object.entries(orderedWorkout).filter(([key, value]) => !!value.value))

  return (
    <View style={{ marginVertical: 20 }}>
      <Text style={{ fontSize: 25 }}>
        Workout:
        <Text style={{ fontWeight: '500' }}> {capitaliseFirstLetter(props.workout?.title as string)}</Text>
        {props.isWorkoutCompleted && <FontAwesomeIcon icon={faCheckCircle} color={'#52B788'} />}
      </Text>

      {!isTimerActive && (
        <View style={{ marginTop: 20 }}>
          <BaseButton text="Start workout" onPress={handleStartWorkout}></BaseButton>
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
                workout.value.map((set, index: number) => (
                  <View key={index} style={{ marginBottom: 10 }}>
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
