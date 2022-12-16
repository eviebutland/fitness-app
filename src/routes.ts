import express, { Request, Response, Router } from 'express'
import { login, logout } from './authentication'
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
// router.get('/login/google', passport.authenticate('google'))
// router.get(
//   '/oauth2/redirect/google',
//   passport.authenticate('google', { failureRedirect: '/login', failureMessage: true }),
//   function (req, res) {
//     console.log('sucessfully authenticated with google')
//     res.redirect('/')
//   }
// )

export function isAuthenticated(req: Request, res: Response, next: Function) {
  return passport.authenticate('bearer', { session: false }, function (err, user, info) {
    if (err === null && user) {
      next()
    } else if (err) {
      res.status(401).json(err)
    } else {
      res.status(401).json(info)
    }

    console.log(err)
  })(req, res, next)
}

// Authentication
router.get('/login', login)
router.get('/logout/:id', logout)

// Users
router.get('/users', isAuthenticated, getUsers)
router.post('/users', isAuthenticated, createUser)
router.patch('/users/:id', isAuthenticated, updateUser)
router.delete('/users/:id', isAuthenticated, deleteUser)
router.get('/users/:id', isAuthenticated, getAUser)

// Exercises
router.get('/exercises', isAuthenticated, getAllExercises)
router.post('/exercises', isAuthenticated, createExcerise)
router.patch('/exercises/:id', isAuthenticated, updateExercise)
router.delete('/exercises/:id', isAuthenticated, deleteExercise)

// Workouts
router.get('/workouts', isAuthenticated, getAllWorkouts)
router.get('/workouts/:id', isAuthenticated, getWorkoutByID)
router.get('/workouts/catergory/:catergory', isAuthenticated, getAllExercisesInCatergory)
router.post('/workouts', isAuthenticated, createWorkout)
router.patch('/workouts/:id', isAuthenticated, updateWorkout)
router.delete('/workouts/:id', isAuthenticated, deleteWorkout)
