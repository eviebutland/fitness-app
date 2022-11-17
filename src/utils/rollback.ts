import { Client } from 'pg'

export const rollback = async (client: Client) => {
  try {
    await client.query('ROLLBACK;')
  } catch (error) {
    console.log('could not rollback: ', error)
    throw new Error('Unable to rollback')
  } 
}
