import { CompletedWorkouts } from '../../API/src/lib/types/workouts'
import { LoggedInUser } from '../state/user'
import { createAxiosInstance } from './axios'
import axios from 'axios'
import { UserRequestBody } from '../../API/src/lib/types/user'
import { API_PATH, ADMIN_USERNAME, ADMIN_PASSWORD } from '@env'

const api_path = process.env.NODE_ENV === 'development' ? 'http://localhost:3030' : API_PATH

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
  return await axios.post(`${api_path}/login`, postModel)
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
    const { data } = await axiosInstance.get(`${api_path}/users/${existingUser.id}`)

    if (callback) {
      callback(data)
    }
  } catch (error) {
    console.log(error)
  }
}

export const createUser = async (postModel: UserRequestBody, token: string) => {
  return axios.post(`${api_path}/users`, postModel, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}

export const updatedCompletedWorkouts = (user: LoggedInUser, patchModel: CompletedWorkouts): void => {
  const axiosInstance = createAxiosInstance(user?.token as string)

  axiosInstance.patch(`${api_path}/users/${user.id}/completed-workout`, patchModel)
}

export const updateUser = (id: string, patchModel: Record<string, string>, token: string) => {
  return axios.patch(`${api_path}/users/${id}`, patchModel, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}

export const fetchActivationCode = (patchModel: ActivationCodeModel, token: string) => {
  return axios.patch(`${api_path}/users/activation`, patchModel, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}

export const resetPassword = (postModel: ResetPasswordModel): void => {
  axios.post(`${api_path}/reset-password`, postModel)
}
