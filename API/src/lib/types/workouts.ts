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

interface Reps {
  type: 'weight' | 'time'
  value: number
}
export interface ExerciseJSONB {
  exercise: string
  sets: number
  reps: Array<Reps>
  video: string
}

export interface WorkoutJSONB {
  warmUp: Array<ExerciseJSONB>
  wod?: Array<ExerciseJSONB>
  set: Array<ExerciseJSONB>
  superset?: Array<ExerciseJSONB>
  finisher?: Array<ExerciseJSONB>
  additionalTopUp?: Array<ExerciseJSONB>
  cooldown: Array<ExerciseJSONB>
}

export interface WorkoutFormatted {
  id?: string
  title: string | null
  workout: WorkoutJSONB | null
}

export interface CompletedWorkouts {
  name: string
  workoutId: string
}
