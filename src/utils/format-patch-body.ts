export const formatPatchBody = (columns: string[]) => {
  const set: string[] = []
  columns.forEach((column, index) => {
    set.push(`${column} = $${index + 1}`)
  })

  return set
}
