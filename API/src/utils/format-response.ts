import { QueryResult } from 'pg'

export const composeObject = (data: string): string | null => {
  return data !== null ? JSON.parse(data) : null
}

interface Field {
  [key: string]: Record<string, string>
}

export const formatResponse = (data: QueryResult<any>, fields: string[]) => {
  return data.rows.map(row => {
    const formattedField: Field = {}

    fields.forEach((field: string) => {
      formattedField[field] = JSON.parse(row[field])
    })

    return {
      ...row,
      ...formattedField
    }
  })
}
