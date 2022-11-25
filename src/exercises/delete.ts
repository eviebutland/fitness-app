import { Request, Response } from 'express'
import { client } from '../../server'
import { archiveDocument, deleteDocument } from '../utils/delete'
import { rollback } from '../utils/rollback'

export const deleteExercise = async (request: Request, response: Response) => {
  if (request.params.id === ':id') {
    response.status(404).json({ message: 'Please provide an ID to delete' })
    return
  }
  try {
    await client.query('BEGIN TRANSACTION')
    // Get hold of record
    const findQuery = `SELECT * FROM exercises
    WHERE id = $1`
    const exerciseToDelete = await client.query(findQuery, [request.params.id])

    if (exerciseToDelete.rows.length > 0) {
      // Insert into archive database
      await archiveDocument(exerciseToDelete.rows[0], 'exercises_archive')
    } else {
      response.json({
        message: `There is no exercise with ID: ${request.params.id}`
      })

      return
    }

    // remove from current database
    const deletedRes = await deleteDocument(request, 'exercises')

    await client.query('COMMIT TRANSACTION')
    response.json({
      message: `Exercise with ID: ${request.params.id} has been successfully deleted`,
      result: deletedRes
    })
  } catch (error) {
    console.log(error)
    rollback(client)
    response.status(500).json({ message: 'Something went wrong', error })
  }
}
