import express from 'express'
import { login } from './authentication/login'
import { getUsers, createUser, updateUser, deleteUser, getAUser } from './users/index'

export const router = express.Router()

// Authentication
router.get('/login', login)

// Users
router.get('/users', getUsers)
router.post('/users', createUser)
router.patch('/users/:id', updateUser)
router.delete('/users/:id', deleteUser)
router.get('/users/:id', getAUser)
