import { atom, selector } from 'recoil'

export const todaysWorkoutState = atom({
  key: 'todaysWorkoutState',
  default: []
})

export const todaysWorkoutGetter = selector({
  key: 'todaysWorkoutGetter',
  get: ({ get }) => {
    return get(todaysWorkoutState)
  }
})

export const completedSetsState = atom({
  key: 'completedSetsState',
  default: {}
})

export const completedSetsGetter = selector({
  key: 'completedSetsGetter',
  get: ({ get }) => {
    return get(completedSetsState)
  }
})
