import { Request, Response } from 'express'
import { QueryResult } from 'pg'
import { client } from '../../server'
import { rollback } from '../utils/rollback'
interface User {
  id: string
  name: string
  age: number
  email: string
  password: string
  levelofaccess: string
  premium: string // could use a type here 'STANDARD' ..
  completedworkouts: string[]
  permissions: string
  workoutpreference: string
}

export const deleteUser = async (request: Request, response: Response) => {
  if (request.params.id === ':id') {
    response.send({ message: 'Error: Please provide an ID' })
    return
  }

  client.query('BEGIN', async error => {
    if (error) {
      rollback(client)
    }

    // Get the record first
    const query = `SELECT * FROM users
    WHERE id = $1`

    try {
      const res: QueryResult<User> = await client.query(query, [request.params.id])
      const rowToArchive = res.rows.find(row => row.id == request.params.id)

      if (rowToArchive) {
        await archiveDocument(rowToArchive)

        await deleteDocument(request, response)

        client.query('COMMIT', error => {
          if (error) {
            console.log('Error committing transaction', error)
          } else {
            console.log('Successful transaction')
          }
        })
      }
    } catch (error) {
      rollback(client)
    }
  })
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
