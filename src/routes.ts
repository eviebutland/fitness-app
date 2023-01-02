import express, { NextFunction, Request, Response, Router } from 'express'
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

export function isAuthorized(permissions: string) {
  return passport.authorize('bearer', { session: false }, function (err, user, info) {
    // return user?.permissions || user.permissions === permissions
    console.log(user)
    if (!user?.permissions || user?.permissions !== permissions) {
      return false
    } else {
      console.log('has access')
      return true
    }
  })()
}

// Authentication
router.get('/login', login)
router.get('/logout/:id', logout)

// Users
router.get(
  '/users',
  // isAuthorized('yes'),
  // isAuthorized('rw:users'),
  // (req: Request, res: Response, next: NextFunction) => {
  //   console.log(isAuthenticated(req, res, next))
  //   return isAuthenticated(req, res, next) ? next() : res.status(401).json({ message: 'Please login' })

  // ? isAuthorized(req, res, next, 'rw:user')
  //   ? next()
  //   : res.status(401).json({ message: 'You do not have access to this resource' })
  // : res.status(401).json({ message: 'Please login' })

  // it shouldn't fall into here if the first fails
  // },
  getUsers
)
router.post('/users', isAuthorized, createUser)
router.patch('/users/:id', isAuthorized, updateUser)
router.delete('/users/:id', isAuthorized, deleteUser)
router.get('/users/:id', isAuthorized, getAUser)

// Exercises
router.get('/exercises', isAuthorized, getAllExercises)
router.post('/exercises', isAuthorized, createExcerise)
router.patch('/exercises/:id', isAuthorized, updateExercise)
router.delete('/exercises/:id', isAuthorized, deleteExercise)

// Workouts
router.get('/workouts', isAuthorized, getAllWorkouts)
router.get('/workouts/:id', isAuthorized, getWorkoutByID)
router.get('/workouts/catergory/:catergory', isAuthorized, getAllExercisesInCatergory)
router.post('/workouts', isAuthorized, createWorkout)
router.patch('/workouts/:id', isAuthorized, updateWorkout)
router.delete('/workouts/:id', isAuthorized, deleteWorkout)
