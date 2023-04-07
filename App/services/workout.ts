import { createAxiosInstance } from './axios'
import { API_PATH } from '@env'

export const fetchWorkoutOfTheDay = async (token: string, day: string) => {
  const axiosInstance = createAxiosInstance(token)

  return await axiosInstance.get(`${API_PATH}/workouts/day?day=${day}`)
}
