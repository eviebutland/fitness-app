import { createAxiosInstance } from './axios'

export const fetchWorkoutOfTheDay = async (token: string, day: string) => {
  const axiosInstance = createAxiosInstance(token)

  return await axiosInstance.get(`http://localhost:3030/workouts/day?day=${day}`)
}
