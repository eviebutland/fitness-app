import { atom } from 'recoil'

import { User } from '../../API/src/lib/types/user'

const newUser: Partial<User> = {
  age: null,
  email: undefined,
  password: undefined,
  levelofaccess: undefined,
  premium: undefined,
  completedworkouts: undefined,
  permissions: undefined,
  workoutpreference: undefined,
  status: undefined,
  name: undefined
}

export const newUserState = atom({
  key: 'newUserState',
  default: newUser
})
