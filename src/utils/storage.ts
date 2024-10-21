// export const getItemFromStorage = (item: string) => {
//   const storageItem = localStorage.getItem(item)
//   if (storageItem) return JSON.parse(storageItem)
// }

export const setItemToLocalStorage = (key: string, value: string) => {
  return typeof window !== 'undefined'
    ? localStorage.setItem(key, value)
    : undefined
}

export const getItemFromStorage = (key: string) => {
  return typeof window !== 'undefined' ? localStorage.getItem(key) : null
}
