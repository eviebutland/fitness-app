import bcrypt from 'bcrypt'
import { Response } from 'express'
import { Client } from 'pg'
export async function saltAndHash(password: string) {
  try {
    const saltCost = 10 // May need to increase this
    const salt = await bcrypt.genSalt(saltCost)
    const hash = await bcrypt.hash(password, salt)

    return hash
  } catch (error) {
    console.log('Error using bcrypt')
  }
}

export const passwordValidation = async (password: string, response: Response, client: Client) => {
  const passwordRegex = /([A-Z]+)([a-z]{3,})([!@£$%^&*()_+]+)([0-9])+/

  if (!passwordRegex.test(password)) {
    await client.query('COMMIT TRANSACTION')
    response.status(400).json({
      message:
        'Password must require at least 1 uppercase, 3 or more lower case, 1 special character and at least 1 number '
    })

    return
  }
}
