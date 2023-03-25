import { CompletedWorkouts } from '../../API/src/lib/types/workouts'
import { LoggedInUser } from '../state/user'
import { createAxiosInstance } from './axios'
import axios from 'axios'
import { UserRequestBody } from '../../API/src/lib/types/user'

interface LoginModel {
  username: string
  password: string
}

interface ActivationCodeModel {
  email: string
  method: 'reset' | 'create'
}

interface ResetPasswordModel {
  email: string
  newPassword: string
}

export const userLogin = async (postModel: LoginModel) => {
  return await axios.post('http://localhost:3030/login', postModel)
}

export const fetchUser = async (existingUser: LoggedInUser, callback?: Function): Promise<void> => {
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

export const createUser = async (postModel: UserRequestBody) => {
  return axios.post('http://localhost:3030/users', postModel)
}

export const updatedCompletedWorkouts = (user: LoggedInUser, patchModel: CompletedWorkouts): void => {
  const axiosInstance = createAxiosInstance(user?.token as string)

  axiosInstance.patch(`http://localhost:3030/users/${user.id}/completed-workout`, patchModel)
}

export const updateUser = (id: string, patchModel: Record<string, string>) => {
  axios.patch(`http://localhost:3030/users/${id}`, patchModel)
}

export const fetchActivationCode = (patchModel: ActivationCodeModel) => {
  return axios.patch('http://localhost:3030/users/activation', patchModel)
}

export const resetPassword = (postModel: ResetPasswordModel): void => {
  axios.post('http://localhost:3030/reset-password', postModel)
}
