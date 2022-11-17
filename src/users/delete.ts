import { Request, Response } from 'express'
import { QueryResult } from 'pg'
import { client } from '../../server'
import { rollback } from '../utils/rollback'
import { User } from '../lib/types/user'

export const deleteUser = async (request: Request, response: Response) => {
  if (request.params.id === ':id') {
    response.send({ message: 'Error: Please provide an ID' })
    return
  }

  // Get the record first
  const query = `SELECT * FROM users
    WHERE id = $1`

  try {
    await client.query('BEGIN TRANSACTION')

    const res: QueryResult<User> = await client.query(query, [request.params.id])
    const rowToArchive = res.rows.find(row => row.id == request.params.id)

    if (rowToArchive) {
      await archiveDocument(rowToArchive)

      await deleteDocument(request, response)

      await client.query('COMMIT')
      response.status(200).json({message:'Successfully deleted user'})
    }
  } catch (error) {
    rollback(client)
    console.log(error)
    response.status(500).json({ message: 'Something went wrong', error })
  }
}

const archiveDocument = async (rowToArchive: User) => {
  try {
    const dataToArchive = {
      name: rowToArchive.name,
      age: rowToArchive.age,
      email: rowToArchive.email,
      password: rowToArchive.password,
      levelOfAccess: rowToArchive.levelofaccess,
      premium: rowToArchive.premium,
      completedWorkouts: rowToArchive.completedworkouts,
      permissions: rowToArchive.permissions,
      workoutPreference: rowToArchive.workoutpreference
    }

    const archiveRes = await client.query(
      `INSERT INTO users_archive (name, age, email, password, levelOfAccess, premium, completedWorkouts, permissions, workoutPreference)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
      [...Object.values(dataToArchive)]
    )
    console.log(archiveRes)
  } catch (error) {
    rollback(client)
  }
}

const deleteDocument = async (request: Request, response: Response) => {
  try {
    const query = `DELETE FROM users
    WHERE id = $1`
    const deletedRes = await client.query(query, [request.params.id])

    response.json({
      message: `User with ID: ${request.params.id} has been successfully deleted`,
      result: deletedRes
    })
  } catch (error) {
    rollback(client)
  }
}
