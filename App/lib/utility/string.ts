export const capitaliseFirstLetter = (word: string) => {
  const firstChar = word.charAt(0).toUpperCase()
  return firstChar + word.slice(1).toLowerCase()
}
