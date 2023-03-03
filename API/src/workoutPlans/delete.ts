import { Request, Response } from 'express'
import { Context } from 'openapi-backend'
import { QueryResult } from 'pg'
import { client } from '../../server'
import { WorkoutPlain } from '../lib/types/workouts'
import { archiveDocument, deleteDocument } from '../utils/delete'
import { rollback } from '../utils/rollback'

export const deleteWorkoutPlan = async (api: Context, request: Request, response: Response): Promise<void> => {
  if (api.request.params.id === ':id') {
    response.status(404).json({ message: 'Please provide an id' })
    return
  }

  try {
    await client.query('BEGIN TRANSACTION')
    // Get hold of workout to delete
    const getWorkoutQuery = `SELECT * FROM workoutPlans
    WHERE id = $1`

    const workoutToDelete = await client.query(getWorkoutQuery, [api.request.params.id])

    if (workoutToDelete.rows[0]) {
      // Move to archive collection
      await archiveDocument(workoutToDelete.rows[0], 'workoutplans_archive')

      const deletedWorkout = await deleteDocument(api.request.params.id as string, 'workoutPlans')

      // Delete from main workout table
      response.status(200).json({
        message: `Workout with ID: ${api.request.params.id} has been successfully deleted`,
        result: deletedWorkout
      })
    } else {
      response.status(400).json({ message: 'Unable to find workout plan' })
    }

    await client.query('COMMIT TRANSACTION')
  } catch (error) {
    rollback(client)
    console.log(error)
    response.status(500).json({ message: 'Something went wrong', error })
  }
}
