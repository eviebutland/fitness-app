import React, { useState } from 'react'
import { View, Image, StyleSheet, Text, Pressable } from 'react-native'
import { useRecoilState } from 'recoil'
import { WorkoutPreference } from '../../../API/src/lib/types/user'
import { BaseButton } from '../../components/base/Button'
import { Container } from '../../components/base/Container'
import { ProgressBar } from '../../components/base/ProgressBar'
import { Title } from '../../components/base/Title'
import { newUserState } from '../../state/register'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'

type Day = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday'
type Workout = 'LOWER' | 'FULL BODY' | 'UPPER' | 'GLUTES' | 'REST'

const WorkoutPreferenceScreen = ({ navigation }) => {
  const [registerDetails, setRegisterDetails] = useRecoilState(newUserState)

  const days: Day[] = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
  // TODO These should come from an API call
  const availableWorkouts: Workout[] = ['LOWER', 'FULL BODY', 'UPPER', 'GLUTES', 'REST']

  const initialPreference: WorkoutPreference = {
    monday: null,
    tuesday: null,
    wednesday: null,
    thursday: null,
    friday: null,
    saturday: null,
    sunday: null
  }
  const [userPreference, setUserPreference] = useState(initialPreference)

  const handleOnPressWorkout = (day: Day, workout: Workout) => {
    setUserPreference({ ...userPreference, [day]: workout })
  }

  const handleTriggerActivationEmail = async () => {
    // TODO API call here to fire email off
    console.log('send email for activation code')
    await setTimeout(() => 3000)
    // add activation code to state
  }
  const handleSubmit = async () => {
    setRegisterDetails({ ...registerDetails, workoutpreference: userPreference })

    try {
      await handleTriggerActivationEmail()
      navigation.navigate('Confirmation')
    } catch (error) {
      console.log('error sending activation code')
    }
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
          {days.map((day: Day, index: number) => (
            <View key={index}>
              <Text style={styles.day}>{day}</Text>
              <View style={styles.workoutContainer}>
                {availableWorkouts.map((workout: Workout, index: number) => (
                  <Pressable key={index} style={styles.workout} onPress={() => handleOnPressWorkout(day, workout)}>
                    {userPreference[day] === workout ? (
                      <FontAwesomeIcon icon={faCheckCircle} color={'#52B788'} />
                    ) : (
                      <Text>{workout.toLowerCase()}</Text>
                    )}
                  </Pressable>
                ))}
              </View>
            </View>
          ))}
        </View>
        <BaseButton text="Save" onPress={handleSubmit} />
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
    resizeMode: 'contain',
    alignSelf: 'center'
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
