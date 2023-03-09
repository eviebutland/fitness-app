import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Title } from '../base/Title'
import { useRecoilValue } from 'recoil'
import { userGetter } from '../../state/user'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'

const Overview = () => {
  const user = useRecoilValue(userGetter)

  const completedWorkouts = ['Full body cardio & core', 'Lower']
  return (
    <View>
      <Title text={`Good morning, ${user.name}`}></Title>
      <View>
        <Text>Today's workout</Text>
        <View>{/* get workout name here */}</View>

        <View>
          {/* donught component here to show steps out of 10,000 */}
          <Text>Keep going, you are almost there!</Text>
        </View>

        <View>
          <Text>Completed in past 2 days</Text>
          {completedWorkouts.map(completedWorkout => (
            <View style={styles.completedWorkout}>
              <Text>{completedWorkout}</Text>
              <FontAwesomeIcon icon={faCheckCircle} color="#8DBDA7"></FontAwesomeIcon>
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
    alignItems: 'center'
  }
})
export default Overview
