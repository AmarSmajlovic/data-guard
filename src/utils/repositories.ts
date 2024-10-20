import type { Repository } from '@/types/repositories'

export const mapRepositories = (repos: Repository[]) => {
  return repos.reduce(
    (acc, repo) => {
      const language = repo.language || 'Other'
      if (!acc[language]) {
        acc[language] = []
      }
      acc[language].push(repo)
      return acc
    },
    {} as Record<string, Repository[]>,
  )
}
