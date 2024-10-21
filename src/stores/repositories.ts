import { defineStore } from 'pinia'
import { fetchRepositories } from '@/http/api'
import type { Repository } from '@/types/repositories'

export const useRepositories = defineStore('repositories', {
  state: () => ({
    repositories: [] as Repository[],
    loading: false,
    loadingMore: {} as Record<string, boolean>,
    error: null as { message: string; code: number } | null,
    filters: {
      language: undefined as string[] | undefined,
      fromDate: undefined,
      toDate: undefined,
      minStars: 0,
    },
    pages: {
      current: 1,
      total: 0,
    },
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
    async loadMore(language: string) {
      if (this.loadingMore[language] || this.pages.current > this.pages.total)
        return

      this.loadingMore[language] = true

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
      this.loadingMore[language] = false
      this.error = error
    },
  },
})
