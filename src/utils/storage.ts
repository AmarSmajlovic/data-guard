export const setItemToLocalStorage = (key: string, value: string) => {
  return typeof window !== 'undefined'
    ? localStorage.setItem(key, value)
    : undefined
}

export const getItemFromStorage = (key: string) => {
  return typeof window !== 'undefined' ? localStorage.getItem(key) : null
}
