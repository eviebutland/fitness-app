import { atom, selector } from 'recoil'

type ActiveModalState = Array<string>

const defaultState: ActiveModalState = []

export const activeModalState = atom({
  key: 'activeModalState',
  default: defaultState
})

export const activeModalGetter = selector({
  key: 'activeModalGetter',
  get: ({ get }) => {
    const state = get(activeModalState)
    return get(activeModalState)
  }
})
