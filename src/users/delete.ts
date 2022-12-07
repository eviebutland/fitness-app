import { Request, Response } from 'express'
import { QueryResult } from 'pg'
import { client } from '../../server'
import { rollback } from '../utils/rollback'
import { User } from '../lib/types/user'
import { archiveDocument, deleteDocument } from '../utils/delete'

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
      await archiveDocument(rowToArchive, 'users_archive')

      const deletedRes = await deleteDocument(request.params.id, 'users')

      response.status(200).json({
        message: `User with ID: ${request.params.id} has been successfully deleted`,
        result: deletedRes
      })

      await client.query('COMMIT')
      response.status(200).json({ message: 'Successfully deleted user' })
    } else {
      response.json({
        message: `There is no user with ID: ${request.params.id}`
      })

      return
    }
  } catch (error) {
    rollback(client)
    console.log(error)
    response.status(500).json({ message: 'Something went wrong', error })
  }
}
