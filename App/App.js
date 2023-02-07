import { StyleSheet } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import RegisterScreen from './screens/register/RegisterScreen'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import PricingScreen from './screens/register/PricingScreen'
import { BaseButton } from './components/base/Button'
import WorkoutPreference from './screens/register/WorkoutPreferenceScreen'
import { RegisterContext } from './context/RegistrationContext'
import RegistrationForm from './components/forms/RegistrationForm'

const { Navigator, Screen, Group } = createNativeStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Navigator>
        <Group
          screenOptions={({ navigation }) => ({
            headerLeft: () => <BaseButton text="Go back" onPress={navigation.goBack} isTransparent />
          })}
        >
          {/* <RegistrationForm></RegistrationForm> */}
          <Screen name="Register" component={RegisterScreen}></Screen>
          <Screen name="Pricing" component={PricingScreen} options={{ title: 'Pricing' }}></Screen>
          <Screen name="WorkoutPreference" component={WorkoutPreference}></Screen>
        </Group>
      </Navigator>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
})
