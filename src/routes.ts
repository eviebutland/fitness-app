import express from 'express'
import { getUsers, createUser, updateUser, deleteUser, getAUser } from './users/index'

export const router = express.Router()

router.get('/users', getUsers)
router.post('/users', createUser)
router.patch('/users/:id', updateUser)
router.delete('/users/:id', deleteUser)
router.get('/users/:id', getAUser)
