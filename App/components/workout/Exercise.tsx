import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

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
  const handleClickTooltip = () => {
    console.log('show description')
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

          <View style={{ flexDirection: 'row', paddingBottom: 10, alignItems: 'center' }}>
            <Text style={{ paddingRight: 20, fontSize: 20, fontWeight: '500' }}>{props.time}s</Text>
            <Text>{`Repeat ${
              intensityToSet[parseInt(props.exercise?.intensity) as keyof IntensityToSet]
            } times`}</Text>
          </View>
        </View>
      </View>

      <Text style={{ paddingVertical: 10 }}>
        Variations:{' '}
        {props.exercise.variations.map((variation, index) => (
          <Text>
            {variation}
            {index + 1 < props.exercise?.variations.length && ', '}
          </Text>
        ))}
      </Text>
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
