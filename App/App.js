import { StyleSheet } from 'react-native'
import { NavigationContainer, useRoute, getFocusedRouteNameFromRoute } from '@react-navigation/native'
import RegisterScreen from './screens/register/RegisterScreen'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import PricingScreen from './screens/register/PricingScreen'
import { BaseButton } from './components/base/Button'
import WorkoutPreference from './screens/register/WorkoutPreferenceScreen'
import { RecoilRoot } from 'recoil'
import ConfirmationScreen from './screens/register/ConfirmationScreen'
import DashboardScreen from './screens/DashboardScreen'
import EntryScreen from './screens/Entry'
import LoginScreen from './screens/login/Login'
import PasswordResetScreen from './screens/login/PasswordReset'

const { Navigator, Screen, Group } = createNativeStackNavigator()

export default function App() {
  return (
    <RecoilRoot>
      <NavigationContainer>
        <Navigator initialRouteName="Login">
          <Group>
            <Screen name="Login" component={LoginScreen}></Screen>
            <Screen
              name="ResetPassword"
              component={PasswordResetScreen}
              options={({ navigation }) => ({
                headerLeft: () => (
                  <BaseButton
                    text="Go back"
                    onPress={() => {
                      navigation.navigate('Login')
                    }}
                    isTransparent
                  />
                )
              })}
            ></Screen>
          </Group>

          <Group
            screenOptions={({ navigation }) => ({
              headerLeft: () => {
                const route = useRoute()

                return (
                  <BaseButton
                    text="Go back"
                    onPress={() => {
                      if (route.name === 'Register') {
                        navigation.navigate('Login')
                      } else {
                        navigation.goBack()
                      }
                    }}
                    isTransparent
                  />
                )
              }
            })}
          >
            <Screen name="Register" component={RegisterScreen}></Screen>
            <Screen name="Pricing" component={PricingScreen} options={{ title: 'Pricing' }}></Screen>
            <Screen name="WorkoutPreference" component={WorkoutPreference}></Screen>
            <Screen name="Confirmation" component={ConfirmationScreen}></Screen>
          </Group>

          {/* check login status in here? */}
          <Group screenOptions={{ headerLeft: () => {} }}>
            <Screen name="Entry" component={EntryScreen} options={{ title: '', headerTitle: '' }}></Screen>
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
