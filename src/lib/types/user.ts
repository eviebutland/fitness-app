export interface User {
  id: string
  name: string
  age: number
  email: string
  password: string
  levelofaccess: string
  premium: string // could use a type here 'STANDARD' ..
  completedworkouts: string[]
  permissions: string
  workoutpreference: string
}
