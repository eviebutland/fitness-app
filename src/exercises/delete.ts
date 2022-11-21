import { Request, Response } from 'express'
import { QueryResult } from 'pg'
import { client } from '../../server'
import { Exercise } from '../lib/types/exercise'
import { rollback } from '../utils/rollback'

export const deleteExercise = async (request: Request, response: Response) => {
  console.log(request.params.id)
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
    console.log(exerciseToDelete)

    if (exerciseToDelete.rows.length) {
      // Insert into archive database

      const insertToArchiveQuery = `INSERT INTO exercises_archive`
      await archiveDocument(exerciseToDelete.rows[0], 'exercises_archive')
    }
    // remove from current database
    // commit transaction
  } catch (error) {
    console.log(error)
    rollback(client)
    response.status(500).json({ message: 'Something went wrong', error })
  }
}

const archiveDocument = async (rowToArchive: Exercise, database: string) => {
  try {
    const dataToArchive = {
      name: rowToArchive.name,
      description: rowToArchive.description,
      resttime: rowToArchive.resttime,
      recommendedreprange: rowToArchive.recommendedreprange,
      catergory: rowToArchive.catergory,
      intensity: rowToArchive.intensity,
      iscompound: rowToArchive.iscompound,
      exercisetime: rowToArchive.exercisetime,
      video: rowToArchive.video,
      variations: rowToArchive.variations
    }

    const keys = Object.keys(dataToArchive)

    const postgresVars: string[] = []
    Object.keys(dataToArchive).forEach((key, index) => postgresVars.push(`$${index + 1}`))

    console.log(...postgresVars)
    const archiveRes: QueryResult = await client.query(
      `INSERT INTO ${database} (${...keys})
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
      [...Object.values(dataToArchive)]
    )
    // console.log(archiveRes)
  } catch (error) {
    rollback(client)
  }
}
