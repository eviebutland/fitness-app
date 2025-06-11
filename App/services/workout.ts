import { createAxiosInstance } from './axios'
import { API_PATH } from '@env'
import { mockWorkouts } from './mockWorkouts'

export const fetchWorkoutOfTheDay = async (token: string, day: string) => {
  if (__DEV__) {
    await new Promise(resolve => setTimeout(resolve, 500))

    const randomWorkout = mockWorkouts[Math.floor(Math.random() * mockWorkouts.length)]
    return {
      data: {
        message: 'Successfully sent',
        workout: randomWorkout
      }
    }
  }

  const axiosInstance = createAxiosInstance(token)
  return await axiosInstance.get(`${API_PATH}/workouts/day?day=${day}`)
}
