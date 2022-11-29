import express from 'express'
import { login } from './authentication/login'
import { createExcerise, getAllExercises, updateExercise, deleteExercise } from './exercises'
import { getUsers, createUser, updateUser, deleteUser, getAUser } from './users/index'
import { getAllWorkouts, getWorkoutByID, getAllExercisesInCatergory, updateWorkout } from './workouts'

export const router = express.Router()

// Authentication
router.get('/login', login)

// Users
router.get('/users', getUsers)
router.post('/users', createUser)
router.patch('/users/:id', updateUser)
router.delete('/users/:id', deleteUser)
router.get('/users/:id', getAUser)

// Exercises
router.get('/exercises', getAllExercises)
router.post('/exercises', createExcerise)
router.patch('/exercises/:id', updateExercise)
router.delete('/exercises/:id', deleteExercise)

// Workouts
router.get('/workouts', getAllWorkouts)
router.get('/workouts/:id', getWorkoutByID)
router.get('/workouts/catergory/:catergory', getAllExercisesInCatergory)
router.patch('/workouts/:id', updateWorkout)
