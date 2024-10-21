import type { RepositoriesState, Repository } from '@/types/repositories'

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
export const getPlainStore = (store: RepositoriesState) => {
  return {
    repositories: store.repositories,
    loading: store.loading,
    loadingMore: store.loadingMore,
    error: store.error,
    filters: store.filters,
    pages: store.pages,
    languageListScroll: store.languageListScroll,
  }
}
