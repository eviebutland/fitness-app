type Premium = 'standard' | 'gold'
type LevelOfAccess = 'subscriber' | 'admin'
type Status = 'active' | 'inactive'
// Permissions
// admin -> rw:u, rw:w, rw:e
// subscriber -> rw:u, r:w, r:e
// u -> user
// w -> workouts
// e -> exercises

export interface User {
  id: string
  name: string
  age: number
  email: string
  password: string
  levelofaccess: LevelOfAccess
  premium: Premium
  completedworkouts: string[]
  permissions: string
  workoutpreference: string
  status: Status
}
