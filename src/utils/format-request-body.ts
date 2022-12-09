export const formatPatchBody = (columns: string[]): string[] => {
  const set: string[] = []
  columns.forEach((column, index) => {
    set.push(`${column} = $${index + 1}`)
  })

  return set
}

export const formatKeyValueStrings = (arrayOfValues: string[]): string => {
  let valueString = ''

  for (const value of arrayOfValues) {
    if (arrayOfValues.indexOf(value) !== arrayOfValues.length - 1) {
      valueString += `${value}, `
    } else {
      valueString += value
    }
  }
  return valueString
}
