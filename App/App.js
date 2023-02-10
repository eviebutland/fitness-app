import { StyleSheet } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import RegisterScreen from './screens/register/RegisterScreen'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import PricingScreen from './screens/register/PricingScreen'
import { BaseButton } from './components/base/Button'
import WorkoutPreference from './screens/register/WorkoutPreferenceScreen'
import { RecoilRoot } from 'recoil'
import ConfirmationScreen from './screens/register/ConfirmationScreen'
import DashboardScreen from './screens/DashboardScreen'

const { Navigator, Screen, Group } = createNativeStackNavigator()

export default function App() {
  return (
    <RecoilRoot>
      <NavigationContainer>
        <Navigator>
          <Group
            screenOptions={({ navigation }) => ({
              headerLeft: () => {
                return <BaseButton text="Go back" onPress={navigation.goBack} isTransparent />
              }
            })}
          >
            <Screen name="Register" component={RegisterScreen}></Screen>
            <Screen name="Pricing" component={PricingScreen} options={{ title: 'Pricing' }}></Screen>
            <Screen name="WorkoutPreference" component={WorkoutPreference}></Screen>
            <Screen name="Confirmation" component={ConfirmationScreen}></Screen>
          </Group>

          <Group>
            <Screen name="Dashboard" component={DashboardScreen}></Screen>
          </Group>
        </Navigator>
      </NavigationContainer>
    </RecoilRoot>
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
