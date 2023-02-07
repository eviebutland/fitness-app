import { createContext } from 'react'
import { User } from '../../API/src/lib/types/user'

const newUser: Partial<User> = {
  age: undefined,
  email: undefined,
  password: undefined,
  levelofaccess: undefined,
  premium: undefined,
  completedworkouts: undefined,
  permissions: undefined,
  workoutpreference: undefined,
  status: undefined,
  name: ''
}

export const RegisterContext = createContext(newUser)
