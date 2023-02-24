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

interface CompletedSets {
  [key: string]: {
    [key: number]: {
      reps: null
      weight: null
    }
  }
}
export const completedSetsState = atom({
  key: 'completedSetsState',
  default: {
    set_1: {},
    set_2: {},
    set_3: {}
  }
})

export const completedSetsGetter = selector({
  key: 'completedSetsGetter',
  get: ({ get }) => {
    return get(completedSetsState)
  }
})
