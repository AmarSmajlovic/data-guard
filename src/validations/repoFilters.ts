export const fromDateRule = (value?: string, toDate?: string) => {
  if (!value) return true
  if (toDate && new Date(value) > new Date(toDate)) {
    return 'From date cannot be later than To date.'
  }
  return true
}

export const toDateRule = (value?: string, fromDate?: string) => {
  if (!value) return true
  if (fromDate && new Date(value) < new Date(fromDate)) {
    return 'To date must be after From date.'
  }
  return true
}
