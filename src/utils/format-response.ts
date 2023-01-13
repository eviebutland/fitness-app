import { QueryResult } from 'pg'

export const composeObject = (data: string): string | null => {
  return data !== null ? JSON.parse(data) : null
}

export const formatResponse = (data: QueryResult<any>, fields: string[]) => {
  return data.rows.map(row => {
    // needs some work
    return {
      ...row,
      ...fields.flatMap(field => {
        return {
          [field]: JSON.parse(row[field])
        }
      })
    }
  })
}
