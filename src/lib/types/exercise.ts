export interface Exercise {
  name: string
  description: string
  resttime: string // in seconds
  recommendedreprange: number
  catergory: string
  intensity: number
  iscompound: true
  exercisetime: number
  video: string
  variations: string[] // -> need to be used for a JOIN
}
