export interface WorkoutPlain {
  name: string
  set1: number
  set2: number
  set3: number
}

interface Set {
  name: string
  description: string
  variations: string[]
  intensity: string
  video: string
  exerciseTime: string
}

export interface WorkoutFormatted {
  id?: number
  workoutName: string
  resttime: string
  set1: Set
  set2: Set
  set3: Set
}
