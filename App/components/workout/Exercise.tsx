import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import React, { useEffect, useRef, useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { BaseButton } from '../base/Button'

interface IntensityToSet {
  [key: number]: number
}
interface Exercise {
  name: string
  description: string
  intensity: string
  video: string
  variations: string[]
}

interface ExerciseProps {
  exercise: Exercise
  time: string
  set: number
  reps: number
}
const intensityToSet: IntensityToSet = {
  1: 5,
  2: 5,
  3: 5,
  4: 4,
  5: 4,
  6: 4,
  7: 3,
  8: 3,
  9: 3,
  10: 2
}

const Exercise = (props: ExerciseProps) => {
  const intervalRef = useRef(null)
  const [completedExercise, setCompletedExercise] = useState({}) // use this for timers?

  const numberOfSets = intensityToSet[parseInt(props.exercise?.intensity) as keyof IntensityToSet]

  const handleClickTooltip = () => {
    console.log('show description')
  }

  const handleCompleteSet = (reps: number, set: number, index: number) => {
    // open modal
    console.log('reps', reps)
    console.log('set', set)
    console.log('index', index)

    const completedSet = { [index]: { reps: 20 } }

    // {
    //   1: { // sets
    //     1: {reps: 20}, // index
    //     2: {reps: 20}
    //   }
    // }
    console.log('completed set', completedSet)
    setCompletedExercise({ [set]: completedSet })
    // console.log(completedExercise)
  }

  return (
    <View>
      <Text style={{ paddingBottom: 10, fontSize: 15, fontWeight: '500' }}>Set {props.set}</Text>

      <View style={styles.workoutContainer}>
        <View style={styles.video}>
          <Text>
            Video here
            {props.exercise?.video}
          </Text>
        </View>

        <View style={styles.description}>
          <View style={{ flexDirection: 'row', paddingBottom: 10, alignItems: 'center' }}>
            <Text style={{ fontWeight: '500', paddingRight: 10, fontSize: 20 }}>{props.exercise?.name}</Text>

            <View onTouchStart={handleClickTooltip}>
              <FontAwesomeIcon icon={faInfoCircle} color={'#2D6A4F'} size={20} />
            </View>
          </View>

          {props.exercise?.variations && props.exercise?.variations.length && (
            <Text style={{ paddingVertical: 10 }}>
              Variations:{' '}
              {props.exercise.variations.map((variation, index) => (
                <Text>
                  {variation}
                  {index + 1 < props.exercise?.variations.length && ', '}
                </Text>
              ))}
            </Text>
          )}
        </View>
      </View>

      <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
        {new Array(numberOfSets).fill(0).map((_, index) => (
          // send reps to trigger modal to record
          <BaseButton
            style={{ backgroundColor: '#B7E4C7', marginRight: 10, marginBottom: 10 }}
            text={`${props.reps}`}
            isTransparent={true}
            onPress={() => handleCompleteSet(props.reps, props.set, index)}
          ></BaseButton>
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
export default Exercise
