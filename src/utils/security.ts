import bcrypt from 'bcrypt'

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
