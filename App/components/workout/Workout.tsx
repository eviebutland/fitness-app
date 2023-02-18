import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { WorkoutFormatted } from '../../../API/src/lib/types/workouts'
import Exercise from './Exercise'
import { BaseButton } from '../base/Button'

interface WorkoutProps {
  workout: WorkoutFormatted
}

const Workout = (props: WorkoutProps) => {
  const handleStartTimer = () => {
    console.log('start workout timer')
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

      {/* Display start button until click, then show timers */}
      <BaseButton text="Start workout" onPress={handleStartTimer}></BaseButton>

      <View style={{ marginTop: 20 }}>
        {sets.map(set => (
          <View style={{ marginBottom: 10 }}>
            <Exercise exercise={set.workout} time={set.workout?.exerciseTime} set={set.set}></Exercise>
          </View>
        ))}
      </View>
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
