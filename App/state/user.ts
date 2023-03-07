import { atom, selector } from 'recoil'

import { User } from '../../API/src/lib/types/user'

interface LoggedInUser extends Partial<User> {
  token: string | undefined
}

const user: LoggedInUser = {
  age: null,
  email: undefined,
  password: undefined,
  levelofaccess: undefined,
  premium: undefined,
  completedworkouts: undefined,
  permissions: undefined,
  workoutpreference: undefined,
  status: undefined,
  name: undefined,
  token: undefined
}

export const userState = atom({
  key: 'userState',
  default: user
})

export const userGetter = selector({
  key: 'userGetter',
  get: ({ get }) => {
    const state = get(userState)
    return get(userState)
  }
})
