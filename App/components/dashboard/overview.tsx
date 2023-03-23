import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import { Title } from '../base/Title'
import { useRecoilValue } from 'recoil'
import { userGetter } from '../../state/user'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { BaseButton } from '../base/Button'
import { todaysWorkoutGetter } from '../../state/workouts'
import StepCounter from '../base/StepCounter'
import { capitaliseFirstLetter } from '../../lib/utility/string'
import dayjs from 'dayjs'

interface OverviewProps {
  handleDisplayWorkout: () => void
}

const Overview = (props: OverviewProps) => {
  const user = useRecoilValue(userGetter)
  const workout = useRecoilValue(todaysWorkoutGetter)

  const timeNow = dayjs(new Date()).hour()

  const welcomeString = timeNow > 12 ? 'Good afternoon' : 'Good morning'

  const completedWorkouts = ['Full body cardio & core', 'Lower']
  return (
    <View>
      <Title text={`${welcomeString}, ${capitaliseFirstLetter(user.name ?? '')}`}></Title>
      <View>
        <View>
          {typeof workout === 'string' ? (
            <View style={{ justifyContent: 'flex-start', paddingBottom: 30 }}>
              <Text style={{ fontSize: 25, fontWeight: 'bold' }}>Relax,</Text>
              <Text style={{ fontSize: 25 }}>You've got a rest day</Text>
              <View style={styles.imageContainer}>
                <Image
                  style={styles.image}
                  source={require('../../assets/rest.png')}
                  accessibilityLabel="App icon"
                />
              </View>
            </View>
          ) : (
            <View>
              <Text style={{ fontSize: 20, fontWeight: '600' }}>Today's workout</Text>
              <View
                style={{
                  backgroundColor: '#B7E4C7',
                  borderRadius: 5,
                  paddingHorizontal: 10,
                  paddingVertical: 10,
                  marginTop: 10
                }}
              >
                <View
                  style={{
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingTop: 10,
                    paddingBottom: 20
                  }}
                >
                  <Text style={{ fontSize: 17, fontWeight: '500' }}>{capitaliseFirstLetter(workout?.title)}</Text>
                  {/* if completed then tick this */}
                  <FontAwesomeIcon size={25} icon={faCheckCircle} color={'#52B788'}></FontAwesomeIcon>
                </View>
                <BaseButton text={'Start workout'} onPress={props.handleDisplayWorkout}></BaseButton>
              </View>
            </View>
          )}
        </View>

        <View style={{ marginTop: typeof workout === 'string' ? 10 : 40, marginBottom: 40 }}>
          {/* donught component here to show steps out of 10,000 */}
          <Text style={{ textAlign: 'center', fontWeight: '500', fontSize: 16 }}>
            Keep going, you are almost there!
          </Text>
          <StepCounter></StepCounter>
        </View>

        <View>
          <Text style={{ fontWeight: '700', fontSize: 20, marginBottom: 10 }}>Completed in past 2 days</Text>
          {completedWorkouts.map(completedWorkout => (
            <View style={styles.completedWorkout}>
              <Text style={{ fontSize: 16 }}>{completedWorkout}</Text>
              <FontAwesomeIcon size={25} icon={faCheckCircle} color="#8DBDA7"></FontAwesomeIcon>
            </View>
          ))}
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  completedWorkout: {
    backgroundColor: '#D3E8DB',
    borderRadius: 5,
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    marginBottom: 10,
    flexDirection: 'row'
  },
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
  }
})
export default Overview
