import { atom, selector } from 'recoil'

import { User } from '../../API/src/lib/types/user'

const user: Partial<User> = {
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

export const userState = atom({
  key: 'userState',
  default: user
})

export const userGetter = selector({
  key: 'userGetter',
  get: ({ get }) => {
    const state = get(userState)
    console.log('state', state)
    return get(userState)
  }
})
