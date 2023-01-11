import { Request, Response } from 'express'
import { Context } from 'openapi-backend'
import { client } from '../../server'
import { formatPatchBody } from '../utils/format-request-body'
import { rollback } from '../utils/rollback'

export const updateExercise = async (api: Context, request: Request, response: Response): Promise<void> => {
  if (request.params.id === ':id') {
    response.status(404).json({ message: 'Please provide an ID to update' })
    return
  }

  if (!Object.keys(request.body).length) {
    response.status(400).json({ message: 'Please provide a request body' })
    return
  }

  try {
    const keys: string[] = Object.keys(request.body)
    const values: string[] = Object.values(request.body)

    const set = formatPatchBody(keys)

    const query = `
    UPDATE exercises
    SET ${set}
    WHERE id = ${request.params.id}
    `
    await client.query('BEGIN TRANSACTION')
    await client.query(query, [...values])

    await client.query('COMMIT TRANSACTION')
    response.status(200).json({ message: 'Successfully updated exercise', id: request.params.id })
  } catch (error) {
    rollback(client)
    console.log(error)
    response.status(500).json({ message: 'Something went wrong', error })
  }
}
