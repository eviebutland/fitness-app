export interface WorkoutPlain {
  name: string
  warmup: string
  cooldown: string
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
  recommededRepRange: number
}

export interface WorkoutFormatted {
  id?: number
  workoutName: string
  resttime: string
  warmup: string[]
  cooldown: string[]
  set1: Set
  set2: Set
  set3: Set
}
