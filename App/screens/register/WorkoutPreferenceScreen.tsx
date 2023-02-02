import React, { useState } from 'react'
import { View, Image, StyleSheet, Text, Pressable } from 'react-native'
import { BaseButton } from '../../components/base/Button'
import { Container } from '../../components/base/Container'
import { ProgressBar } from '../../components/base/ProgressBar'
import { Title } from '../../components/base/Title'

type Day = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday'
type Workout = 'LOWER' | 'FULL BODY' | 'UPPER' | 'GLUTES' | 'REST'

const WorkoutPreferenceScreen = ({ navigation }) => {
  const days: Day[] = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
  // These should come from an API call
  const availableWorkouts: Workout[] = ['LOWER', 'FULL BODY', 'UPPER', 'GLUTES', 'REST']

  const [userPreference, setUserPreference] = useState({
    monday: null,
    tuesday: null,
    wednesday: null,
    thursday: null,
    friday: null,
    saturday: null,
    sunday: null
  })

  const handleOnPressWorkout = (day: Day, workout: Workout) => {
    // Use state management here
    setUserPreference({ ...userPreference, [day]: workout })
    console.log(userPreference)
  }

  return (
    <Container footer={<ProgressBar percentage={90} />}>
      <View>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={require('../../assets/ladyIcon.png')}
            accessibilityLabel="App icon"
          />
        </View>

        <Title text={'Workout Preference'} />

        <View style={styles.workouts}>
          {days.map(day => (
            <View>
              <Text style={styles.day}>{day}</Text>
              <View style={styles.workoutContainer}>
                {availableWorkouts.map((workout: Workout) => (
                  <Pressable style={styles.workout} onPress={() => handleOnPressWorkout(day, workout)}>
                    <Text>{workout.toLowerCase()}</Text>
                  </Pressable>
                ))}
              </View>
            </View>
          ))}
        </View>
        <BaseButton text="Save" onPress={() => navigation.navigate('')} />
      </View>
    </Container>
  )
}

const styles = StyleSheet.create({
  imageContainer: {
    display: 'flex',
    justifyContent: 'center',
    padding: 20,
    alignContent: 'center'
  },
  image: {
    height: 195,
    resizeMode: 'contain'
  },
  day: {
    color: '#1B4332',
    fontWeight: '600',
    marginBottom: 10,
    marginTop: 25
  },
  workouts: {
    marginBottom: 30
  },
  workoutContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row'
  },
  //   'workout:first-child': {
  //     marginLeft: 5
  //   },
  workout: {
    backgroundColor: '#D8F3DC',
    borderRadius: 5,
    alignItems: 'center',
    flex: 1,
    padding: 10,
    justifyContent: 'center',
    marginRight: 5
  }
})

export default WorkoutPreferenceScreen
