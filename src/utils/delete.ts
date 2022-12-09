import { QueryResult } from 'pg'
import { Request } from 'express'
import { Exercise } from '../lib/types/exercise'
import { client } from '../../server'
import { formatKeyValueStrings } from './format-request-body'
import { rollback } from './rollback'
import { User } from '../lib/types/user'
import { WorkoutPlain } from '../lib/types/workouts'

export const deleteDocument = async (docId: string, database: string): Promise<QueryResult<any> | ErrorEvent> => {
  try {
    const query = `DELETE FROM ${database}
      WHERE id = $1`
    const deletedRes: QueryResult<any> = await client.query(query, [docId])

    return deletedRes
  } catch (error) {
    rollback(client)
    console.log(error)
    throw Error('Something went wrong')
  }
}

type Data = User | Exercise | WorkoutPlain

// Share this between other deletes
export const archiveDocument = async (
  dataToArchive: Data,
  archiveDatabase: string
): Promise<QueryResult<any> | ErrorEvent> => {
  try {
    const postgresVars: string[] = []
    const keys = Object.keys(dataToArchive)
    keys.forEach((key, index) => postgresVars.push(`$${index + 1}`))

    const valueString = formatKeyValueStrings(postgresVars)
    const keyString = formatKeyValueStrings(keys)

    const archiveRes: QueryResult = await client.query(
      `INSERT INTO ${archiveDatabase} (${keyString})
        VALUES (${valueString})`,
      [...Object.values(dataToArchive)]
    )

    return archiveRes
  } catch (error) {
    rollback(client)
    console.log(error)
    throw Error('Something went wrong')
  }
}
