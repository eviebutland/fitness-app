import React, { useContext } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import RegisterScreen from '../../screens/register/RegisterScreen'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import PricingScreen from '../../screens/register/PricingScreen'
import { BaseButton } from '../base/Button'
import WorkoutPreference from '../../screens/register/WorkoutPreferenceScreen'
// import { User } from '../../../API/src/lib/types/user'
// import { useNavigationContainerRef } from '@react-navigation/native'
const { Navigator, Screen, Group } = createNativeStackNavigator()

const RegistrationForm = () => {
  //   const navigationRef = useNavigationContainerRef()
  //   console.log(navigationRef)

  return (
    <>
      <Screen name="Register" component={RegisterScreen}></Screen>
      <Screen name="Pricing" component={PricingScreen} options={{ title: 'Pricing' }}></Screen>
      <Screen name="WorkoutPreference" component={WorkoutPreference}></Screen>
    </>
  )
}

export default RegistrationForm
