import { CompletedWorkouts } from '../../API/src/lib/types/workouts'
import { LoggedInUser } from '../state/user'
import { createAxiosInstance } from './axios'

export const fetchUser = async (existingUser: LoggedInUser, callback?: Function) => {
  const axiosInstance = createAxiosInstance(existingUser?.token as string)
  try {
    const { data } = await axiosInstance.get(`http://localhost:3030/users/${existingUser.id}`)

    if (callback) {
      callback(data)
    }
  } catch (error) {
    console.log(error)
  }
}

export const updatedCompletedWorkouts = async (user: LoggedInUser, patchModel: CompletedWorkouts) => {
  const axiosInstance = createAxiosInstance(user?.token as string)

  await axiosInstance.patch(`http://localhost:3030/users/${user.id}/completed-workout`, patchModel)
}
