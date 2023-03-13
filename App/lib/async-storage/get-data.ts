import AsyncStorage from '@react-native-async-storage/async-storage'

export const getData = async (storageKey: string) => {
  try {
    const value = await AsyncStorage.getItem(storageKey)
    if (value !== null) {
      return JSON.parse(value)
    } else {
      return false
    }
  } catch (e) {
    console.log(e)
  }
}
