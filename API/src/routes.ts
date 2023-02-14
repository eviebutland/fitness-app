import express, { NextFunction, Request, Response, Router } from 'express'
import { login, logout, resetPassword } from './authentication'
import { createExcerise, getAllExercises, updateExercise, deleteExercise } from './exercises'
import { getUsers, createUser, updateUser, deleteUser, getAUser } from './users/index'
import {
  getAllWorkouts,
  getWorkoutByID,
  getAllExercisesInCatergory,
  updateWorkout,
  deleteWorkout,
  createWorkout,
  getTodaysWorkout
} from './workouts'
// import passport from '../oauth2'

export const router: Router = express.Router()

// interface RequestWithUserPermissions extends Express.AuthInfo {
//   scope: string
// }

export function isAuthorized(req: Request, res: Response, next: NextFunction, permission: string) {
  const access = permission.split(':')[0]
  const area = permission.split(':')[1]
  // @ts-ignore
  const userPermissions = req?.authInfo?.scope

  const permissionToCheck = JSON.parse(userPermissions).find((userPermission: string) =>
    userPermission.includes(area)
  )

  return permissionToCheck.includes(access)
    ? next()
    : res.status(401).json({ message: 'You do not have access to this resource' })
}

// Authentication
router.post('/login', login)
router.get('/logout/:id', logout)
router.post('/reset-password', resetPassword)

// Users
router.get(
  '/users',
  (req: Request, res: Response, next: NextFunction) => {
    // Minimum level of access required to get the list of users is read:users
    isAuthorized(req, res, next, 'r:user')
  },
  getUsers
)

router.post(
  '/users',
  (req: Request, res: Response, next: NextFunction) => {
    isAuthorized(req, res, next, 'w:user')
  },
  createUser
)

router.patch(
  '/users/:id',
  (req: Request, res: Response, next: NextFunction) => {
    isAuthorized(req, res, next, 'w:user')
  },
  updateUser
)

router.delete(
  '/users/:id',
  (req: Request, res: Response, next: NextFunction) => {
    isAuthorized(req, res, next, 'a:user')
  },
  deleteUser
)

router.get(
  '/users/:id',
  (req: Request, res: Response, next: NextFunction) => {
    isAuthorized(req, res, next, 'r:user')
  },
  getAUser
)

// Exercises
router.get(
  '/exercises',
  (req: Request, res: Response, next: NextFunction) => {
    isAuthorized(req, res, next, 'r:exercises')
  },
  getAllExercises
)

router.post(
  '/exercises',
  (req: Request, res: Response, next: NextFunction) => {
    isAuthorized(req, res, next, 'w:exercises')
  },
  createExcerise
)

router.patch(
  '/exercises/:id',
  (req: Request, res: Response, next: NextFunction) => {
    isAuthorized(req, res, next, 'w:exercises')
  },
  updateExercise
)

router.delete(
  '/exercises/:id',
  (req: Request, res: Response, next: NextFunction) => {
    isAuthorized(req, res, next, 'a:exercises')
  },
  deleteExercise
)

// Workouts
router.get(
  '/workouts',
  (req: Request, res: Response, next: NextFunction) => {
    isAuthorized(req, res, next, 'r:workouts')
  },
  getAllWorkouts
)

router.get(
  '/workouts/:id',
  (req: Request, res: Response, next: NextFunction) => {
    isAuthorized(req, res, next, 'r:workouts')
  },
  getWorkoutByID
)

router.get(
  '/workouts/today',
  (req: Request, res: Response, next: NextFunction) => {
    isAuthorized(req, res, next, 'r:workouts')
  },
  getTodaysWorkout
)

router.get(
  '/workouts/catergory/:catergory',
  (req: Request, res: Response, next: NextFunction) => {
    isAuthorized(req, res, next, 'r:workouts')
  },
  getAllExercisesInCatergory
)

router.post(
  '/workouts',
  (req: Request, res: Response, next: NextFunction) => {
    isAuthorized(req, res, next, 'w:workouts')
  },
  createWorkout
)

router.patch(
  '/workouts/:id',
  (req: Request, res: Response, next: NextFunction) => {
    isAuthorized(req, res, next, 'w:workouts')
  },
  updateWorkout
)

router.delete(
  '/workouts/:id',
  (req: Request, res: Response, next: NextFunction) => {
    isAuthorized(req, res, next, 'a:workouts')
  },
  deleteWorkout
)

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
