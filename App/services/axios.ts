import axios from 'axios'

export const createAxiosInstance = (token: string) => {
  return axios.create({
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}
