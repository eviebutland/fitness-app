export type Premium = 'monthly' | 'quarterly' | 'annually'
type LevelOfAccess = 'subscriber' | 'admin'
type Status = 'active' | 'inactive'
// Permissions
// admin -> rw:u, rw:w, rw:e
// subscriber -> rw:u, r:w, r:e
// u -> user
// w -> workouts
// e -> exercises

export interface WorkoutPreference {
  monday: string | null
  tuesday: string | null
  wednesday: string | null
  thursday: string | null
  friday: string | null
  saturday: string | null
  sunday: string | null
}

export interface User {
  id: string
  name: string
  age: number | null
  email: string
  password: string
  levelofaccess: LevelOfAccess
  premium: Premium
  completedworkouts: string | number[]
  permissions: string
  workoutpreference: string | WorkoutPreference
  status: Status
}

export interface UserRequestBody {
  name: string
  age: number | null
  email: string
  password: string | undefined
  levelOfAccess: LevelOfAccess
  premium: Premium
  completedWorkouts: string | number[]
  permissions: string
  workoutPreference: string | WorkoutPreference
  status: Status
}

export interface UserResponseBody {
  name: string
  age: number | null
  email: string
  password: string | undefined
  levelOfAccess: LevelOfAccess
  premium: Premium
  completedWorkouts: string | number[]
  permissions: string
  workoutPreference: string | WorkoutPreference
  status: Status
}
