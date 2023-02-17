import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { WorkoutFormatted } from '../../../API/src/lib/types/workouts'
import Exercise from './Exercise'

interface WorkoutProps {
  workout: WorkoutFormatted
}

const Workout = (props: WorkoutProps) => {
  return (
    <View>
      <Text style={{ fontSize: 25 }}>
        Workout:
        <Text style={{ fontWeight: '500' }}> {props.workout?.workoutName}</Text>
      </Text>

      {props.workout?.set1 && (
        <Exercise exercise={props.workout?.set1} time={props.workout.set1.exerciseTime} set={1}></Exercise>
      )}

      {props.workout?.set2 && (
        <Exercise exercise={props.workout?.set2} time={props.workout.set2.exerciseTime} set={2}></Exercise>
      )}

      {props.workout?.set3 && (
        <Exercise exercise={props.workout?.set3} time={props.workout.set3.exerciseTime} set={3}></Exercise>
      )}
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
