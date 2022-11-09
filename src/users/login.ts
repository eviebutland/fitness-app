import { Response, Request } from 'express'
import { client } from '../../server'
import { rollback } from '../utils/rollback'

export const login = async (request: Request, response: Response) => {
  try {
    await setTimeout(() => console.log('signing in'), 300)
  } catch (error) {
    rollback(client)
  } finally {
    // do something here
  }
}
