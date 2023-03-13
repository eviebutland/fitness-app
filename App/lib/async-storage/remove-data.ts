import AsyncStorage from '@react-native-async-storage/async-storage'

export const removeData = async (storageKey: string) => {
  try {
    await AsyncStorage.removeItem(storageKey)
  } catch (error) {
    console.log(error)
  }
}
