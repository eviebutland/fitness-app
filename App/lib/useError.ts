import { useEffect, useState } from 'react'

interface AxiosError {
  name: string | null
  message: string | null
}

export function useError() {
  const [error, setError] = useState<AxiosError>({ name: null, message: null })

  const clearError = () => {
    setError({
      name: null,
      message: null
    })
  }

  return {
    setError,
    clearError,
    error
  }
}
