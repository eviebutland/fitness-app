import express from 'express'
import { getUsers, createUser, updateUser, deleteUser } from './users/index'

export const router = express.Router()

router.get('/users', getUsers)
router.post('/users', createUser)
router.patch('/users', updateUser)
router.delete('/users', deleteUser)
