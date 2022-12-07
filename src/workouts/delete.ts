import { Request, Response } from 'express'
import { QueryResult } from 'pg'
import { client } from '../../server'
import { archiveDocument, deleteDocument } from '../utils/delete'
import { rollback } from '../utils/rollback'

export const deleteWorkout = async (request: Request, response: Response) => {
  if (request.params.id === ':id') {
    response.status(404).json({ message: 'Please provide an id' })
    return
  }

  try {
    await client.query('BEGIN TRANSACTION')
    // Get hold of workout to delete
    const getWorkoutQuery = `SELECT * FROM workouts
    WHERE id = $1`

    const workoutToDelete: QueryResult = await client.query(getWorkoutQuery, [request.params.id])

    if (workoutToDelete.rows[0]) {
      // Move to archive collection
      await archiveDocument(workoutToDelete.rows[0], 'workouts_archive')

      const deletedWorkout = await deleteDocument(request.params.id, 'workouts')

      // Delete from main workout table
      response.status(200).json({
        message: `Workout with ID: ${request.params.id} has been successfully deleted`,
        result: deletedWorkout
      })
    }

    await client.query('COMMIT TRANSACTION')
  } catch (error) {
    rollback(client)
    response.status(500).json({ message: 'Something went wrong', error })
  }
}
