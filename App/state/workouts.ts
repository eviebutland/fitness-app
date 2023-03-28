import { atom, selector } from 'recoil'

export const todaysWorkoutState = atom({
  key: 'todaysWorkoutState',
  default: {}
})

export const todaysWorkoutGetter = selector({
  key: 'todaysWorkoutGetter',
  get: ({ get }) => {
    return get(todaysWorkoutState)
  }
})

export const recordedRepsState = atom({
  key: 'recordedRepsState',
  default: 0
})

export const recordedRepsGetter = selector({
  key: 'recordedRepsGetter',
  get: ({ get }) => {
    return get(recordedRepsState)
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

export const completedWorkoutState = atom({
  key: 'completedWorkoutState',
  default: {
    name: '',
    time: '',
    reps: 0
  }
})

export const completedWorkoutGetter = selector({
  key: 'completedWorkoutGetter',
  get: ({ get }) => {
    return get(completedWorkoutState)
  }
})
