import { CompletedWorkouts } from '../../API/src/lib/types/workouts'
import { LoggedInUser } from '../state/user'
import { createAxiosInstance } from './axios'
import axios from 'axios'
import { UserRequestBody } from '../../API/src/lib/types/user'
import { API_PATH, ADMIN_USERNAME, ADMIN_PASSWORD } from '@env'
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
  return await axios.post(`${API_PATH}/login`, postModel)
}

export const loginAsAdmin = async () => {
  return await userLogin({
    username: ADMIN_USERNAME,
    password: ADMIN_PASSWORD
  })
}

export const fetchUser = async (existingUser: LoggedInUser, callback?: Function): Promise<void> => {
  const axiosInstance = createAxiosInstance(existingUser?.token as string)
  try {
    const { data } = await axiosInstance.get(`${API_PATH}/users/${existingUser.id}`)

    if (callback) {
      callback(data)
    }
  } catch (error) {
    console.log(error)
  }
}

export const createUser = async (postModel: UserRequestBody, token: string) => {
  return axios.post(`${API_PATH}/users`, postModel, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}

export const updatedCompletedWorkouts = (user: LoggedInUser, patchModel: CompletedWorkouts): void => {
  const axiosInstance = createAxiosInstance(user?.token as string)

  axiosInstance.patch(`${API_PATH}/users/${user.id}/completed-workout`, patchModel)
}

export const updateUser = (id: string, patchModel: Record<string, string>, token: string) => {
  return axios.patch(`${API_PATH}/users/${id}`, patchModel, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}

export const fetchActivationCode = (patchModel: ActivationCodeModel, token: string) => {
  return axios.patch(`${API_PATH}/users/activation`, patchModel, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}

export const resetPassword = (postModel: ResetPasswordModel): void => {
  axios.post(`${API_PATH}/reset-password`, postModel)
}
