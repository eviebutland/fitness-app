import { Client, QueryResult } from 'pg'

export const rollback = async (client: Client): Promise<QueryResult<any> | ErrorEvent> => {
  try {
    return await client.query('ROLLBACK;')
  } catch (error) {
    console.log('could not rollback: ', error)
    throw new Error('Unable to rollback')
  }
}
