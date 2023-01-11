import { Request, Response } from 'express'
import { Context } from 'openapi-backend'
import { QueryResult } from 'pg'
import { client } from '../../server'
import { Exercise } from '../lib/types/exercise'
import { archiveDocument, deleteDocument } from '../utils/delete'
import { rollback } from '../utils/rollback'

export const deleteExercise = async (api: Context, request: Request, response: Response): Promise<void> => {
  if (api.request.params.id === ':id') {
    response.status(404).json({ message: 'Please provide an ID to delete' })
    return
  }
  try {
    await client.query('BEGIN TRANSACTION')
    // Get hold of record
    const findQuery = `SELECT * FROM exercises
    WHERE id = $1`
    const exerciseToDelete: QueryResult<Exercise> = await client.query(findQuery, [api.request.params.id])

    if (exerciseToDelete.rows.length > 0) {
      // Insert into archive database
      await archiveDocument(exerciseToDelete.rows[0], 'exercises_archive')
    } else {
      response.json({
        message: `There is no exercise with ID: ${api.request.params.id}`
      })

      return
    }

    // remove from current database
    const deletedRes: QueryResult<Exercise> | ErrorEvent = await deleteDocument(api.request.params.id, 'exercises')

    await client.query('COMMIT TRANSACTION')
    response.status(200).json({
      message: `Exercise with ID: ${api.request.params.id} has been successfully deleted`,
      result: deletedRes
    })
  } catch (error) {
    rollback(client)
    console.log(error)
    response.status(500).json({ message: 'Something went wrong', error })
  }
}
