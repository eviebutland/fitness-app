import AsyncStorage from '@react-native-async-storage/async-storage'

export const storeData = async (storageKey: string, value: string) => {
  try {
    await AsyncStorage.setItem(storageKey, value)
  } catch (e) {
    console.log(e)
  }
}
