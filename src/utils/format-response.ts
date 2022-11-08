import { QueryResult } from 'pg'

export const composeObject = (data: string): string | null => {
  return data !== null ? JSON.parse(data) : null
}

export const formatResponse = (data: QueryResult<any>, field: string) => {
  return data.rows.map(row => {
    return {
      ...row,
      [field]: composeObject(row[field])
    }
  })
}
