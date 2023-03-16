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
import { capitaliseFirstLetter } from '../../lib/utility/string'
import axios, { AxiosError } from 'axios'
import ErrorSummary from '../../components/base/ErrorSummary'
import { useError } from '../../lib/useError'
import jwt from 'expo-jwt'
import { storeData } from '../../lib/async-storage/store-data'
type Day = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday'
type Workout = 'LOWER' | 'FULL BODY' | 'UPPER' | 'GLUTES' | 'REST'

const WorkoutPreferenceScreen = ({ navigation }) => {
  const [registerDetails, setRegisterDetails] = useRecoilState(newUserState)
  const { clearError, setError, error } = useError()
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

  const handleSubmit = async () => {
    if (error.name) {
      clearError()
    }

    try {
      // show loading screen whilst api is calling?
      const { data } = await axios.post('http://localhost:3030/users', {
        ...registerDetails,
        age: parseInt(registerDetails.age),
        levelOfAccess: 'subscriber',
        permissions: 'rw:user',
        status: 'inactive',
        completedWorkouts: [],
        password: 'Inact1v3!',
        workoutPreference: userPreference
      })

      console.log(data.token)
      const userToken = jwt.decode(data.token, 'secret')
      const jsonUserToken = JSON.stringify(userToken)
      storeData('userToken', jsonUserToken)

      navigation.navigate('Confirmation')
    } catch (error) {
      console.log(error)
      setError({ name: 'Something went wrong', message: error?.response?.data?.message })
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
              <Text style={styles.day}>{capitaliseFirstLetter(day)}</Text>
              <View style={styles.workoutContainer}>
                {availableWorkouts.map((workout: Workout, index: number) => (
                  <Pressable key={index} style={styles.workout} onPress={() => handleOnPressWorkout(day, workout)}>
                    {userPreference[day] === workout ? (
                      <FontAwesomeIcon icon={faCheckCircle} color={'#52B788'} />
                    ) : (
                      <Text>{capitaliseFirstLetter(workout.toLowerCase())}</Text>
                    )}
                  </Pressable>
                ))}
              </View>
            </View>
          ))}
        </View>

        {!!error && <ErrorSummary error={error}></ErrorSummary>}

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
