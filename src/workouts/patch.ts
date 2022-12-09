import { Request, Response } from 'express'
import { client } from '../../server'
import { formatPatchBody } from '../utils/format-request-body'
import { rollback } from '../utils/rollback'

export const updateWorkout = async (request: Request, response: Response): Promise<void> => {
  if (request.params.id === ':id') {
    response.status(400).json({ message: 'Please provide an ID to update' })
    return
  }

  if (!Object.keys(request.body).length) {
    response.status(400).json({ message: 'Please provide a request body' })
    return
  }

  const keys: string[] = Object.keys(request.body)
  const values: string[] = Object.values(request.body)

  const set: string[] = formatPatchBody(keys)

  const query = `
    UPDATE exercises
    SET ${set}
    WHERE id = ${request.params.id}
    `
  try {
    await client.query('BEGIN TRANSACTION')
    // Can update the set 1, 2, 3
    await client.query(query, [...values])

    await client.query('COMMIT TRANSACTION')
    response.status(500).json({ message: `Successfully updated workout with id: ${request.params.id}` })
  } catch (error) {
    rollback(client)
    console.log(error)
    response.status(500).json({ message: 'Something went wrong', error })
  }
}
