import express from 'express'
import { getUsers } from './users/get'
import { createUser } from './users/post'

export const router = express.Router()
console.log('reached routes')

router.get('/users', getUsers)
router.post('/users', createUser)
// export { getUsers }
