import { View, Text, Image } from 'react-native'
import React from 'react'
import Workout from '../workout/Workout'
import { useRecoilValue } from 'recoil'
import { todaysWorkoutGetter } from '../../state/workouts'

interface WorkoutDisplayProps {
  handleCompleteWorkout: () => void
  handleWorkoutStarted: () => void
}
const WorkoutDisplay = (props: WorkoutDisplayProps) => {
  const workout = useRecoilValue(todaysWorkoutGetter)

  return (
    <View>
      {typeof workout === 'string' && workout === 'REST' ? (
        <View style={{ justifyContent: 'flex-start', paddingVertical: 30 }}>
          <Text style={{ fontSize: 25, fontWeight: 'bold' }}>Relax,</Text>
          <Text style={{ fontSize: 25 }}>You've got a rest day</Text>
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Image
              style={{ width: '90%', justifyContent: 'center' }}
              source={require('../../assets/rest.png')}
              accessibilityLabel="App icon"
            />
          </View>
        </View>
      ) : (
        Object.values(workout).length && (
          <Workout
            workout={workout}
            onCompleteWorkout={props.handleCompleteWorkout}
            isWorkoutCompleted={false}
            onWorkoutStart={props.handleWorkoutStarted}
          ></Workout>
        )
      )}
    </View>
  )
}

export default WorkoutDisplay
