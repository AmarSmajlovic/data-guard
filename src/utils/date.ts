export const formatDate = (date: Date) => {
  const d = new Date(date)
  const year = d.getFullYear()
  const month = `0${d.getMonth() + 1}`.slice(-2) // Add leading zero
  const day = `0${d.getDate()}`.slice(-2) // Add leading zero
  return `${year}-${month}-${day}`
}
