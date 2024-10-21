export const sanitizeLanguage = (language: string) => {
  return language.replace(/[^a-zA-Z0-9-_]/g, '_') // Replace non-alphanumeric characters with underscores
}
