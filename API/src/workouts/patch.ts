import { Request, Response } from 'express'
import { Context } from 'openapi-backend'
import { client } from '../../server'
import { formatPatchBody } from '../utils/format-request-body'
import { rollback } from '../utils/rollback'

export const updateWorkout = async (api: Context, request: Request, response: Response): Promise<void> => {
  if (api.request.params.id === ':id') {
    response.status(400).json({ message: 'Please provide an ID to update' })
    return
  }

  if (!Object.keys(api.request.body).length) {
    response.status(400).json({ message: 'Please provide a request body' })
    return
  }

  const keys: string[] = Object.keys(api.request.body)
  const values: string[] = Object.values(api.request.body)

  const set: string[] = formatPatchBody(keys)

  const query = `
    UPDATE exercises
    SET ${set}
    WHERE id = ${api.request.params.id}
    `
  try {
    await client.query('BEGIN TRANSACTION')
    // Can update the set 1, 2, 3
    await client.query(query, [...values])

    await client.query('COMMIT TRANSACTION')
    response.status(200).json({ message: `Successfully updated workout with id: ${api.request.params.id}` })
  } catch (error) {
    rollback(client)
    console.log(error)
    response.status(500).json({ message: 'Something went wrong', error })
  }
}
