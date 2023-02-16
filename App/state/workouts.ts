import { atom, selector } from 'recoil'

import { WorkoutFormatted } from '../../API/src/lib/types/workouts'

export const todaysWorkoutState = atom({
  key: 'todaysWorkoutState',
  default: []
})

export const todaysWorkoutGetter = selector({
  key: 'todaysWorkoutGetter',
  get: ({ get }) => {
    const state = get(todaysWorkoutState)
    console.log('state', state)
    return get(todaysWorkoutState)
  }
})
