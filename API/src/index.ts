import { Context } from 'vm' // unsure on this
import { createExcerise, getAllExercises, updateExercise, deleteExercise } from './exercises'
import { login, logout, resetPassword } from './authentication'

import { getUsers, updateUser, deleteUser, getAUser, createUser } from './users/index'
import { updateWorkout, deleteWorkout, createWorkout } from './workouts'

import {
  getAllWorkoutPlans,
  getWorkoutPlanById,
  getTodaysWorkout,
  getAllExercisesInCatergory
} from './workoutPlans/index'

export const handlers: Context = {
  login,
  logout,
  resetPassword,
  getAllExercises,
  createExcerise,
  updateExercise,
  deleteExercise,
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  getAUser,
  getAllWorkoutPlans,
  getWorkoutPlanById,
  getTodaysWorkout,
  getAllExercisesInCatergory,
  updateWorkout,
  deleteWorkout,
  createWorkout
}
