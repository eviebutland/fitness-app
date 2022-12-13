import express, { Router } from 'express'
import { login } from './authentication/login'
import { createExcerise, getAllExercises, updateExercise, deleteExercise } from './exercises'
import { getUsers, createUser, updateUser, deleteUser, getAUser } from './users/index'
import {
  getAllWorkouts,
  getWorkoutByID,
  getAllExercisesInCatergory,
  updateWorkout,
  deleteWorkout,
  createWorkout
} from './workouts'
import passport from '../oauth2'

export const router: Router = express.Router()

// Will need a UI to access these
router.get('/login/google', passport.authenticate('google'))
router.get(
  '/oauth2/redirect/google',
  passport.authenticate('google', { failureRedirect: '/login', failureMessage: true }),
  function (req, res) {
    console.log('sucessfully authenticated with google')
    res.redirect('/')
  }
)

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
router.post('/workouts', createWorkout)
router.patch('/workouts/:id', updateWorkout)
router.delete('/workouts/:id', deleteWorkout)
