import bcrypt from 'bcryptjs'

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

export const passwordValidation = (password: string) => {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{1,}$/

  if (!passwordRegex.test(password)) {
    return {
      error: true,
      message:
        'Password must require at least 1 uppercase, 3 or more lower case, 1 special character and at least 1 number '
    }
  } else {
    return {
      error: false
    }
  }
}
