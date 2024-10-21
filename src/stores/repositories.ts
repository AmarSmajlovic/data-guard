import { defineStore } from 'pinia'
import { fetchRepositories } from '@/http/api'
import type { RepositoriesState } from '@/types/repositories'

export const useRepositories = defineStore<'repositories', RepositoriesState>(
  'repositories',
  {
    state: (): RepositoriesState => ({
      repositories: [],
      loading: false,
      loadingMore: {},
      error: null,
      filters: {
        language: undefined,
        fromDate: undefined,
        toDate: undefined,
        minStars: 0,
      },
      pages: {
        current: 1,
        total: 0,
      },
      languageListScroll: {},
    }),
    actions: {
      async getRepositories() {
        this.loading = true
        this.error = null

        const { loading, data, error } = await fetchRepositories(this.filters)

        this.loading = loading
        this.repositories = data.items
        this.pages.current = 2
        this.pages.total = Math.ceil(data.total_count / 30)
        this.error = error
      },
      async loadMore(language: string[]) {
        if (
          this.loadingMore[language[0]] ||
          this.pages.current > this.pages.total
        )
          return

        this.loadingMore[language[0]] = true

        const newFilters = {
          ...this.filters,
          language: language,
        }

        const { data, error } = await fetchRepositories(
          newFilters,
          this.pages.current,
        )

        if (!error) {
          this.repositories.push(...data.items)
          this.pages.current += 1
        }
        this.loadingMore[language[0]] = false
        this.error = error
      },
    },
  },
)
