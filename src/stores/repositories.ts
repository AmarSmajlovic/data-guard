import { defineStore } from 'pinia'
import { fetchRepositories } from '@/http/api'
import type { Repository } from '@/types/repositories'

export const useRepositories = defineStore('repositories', {
  state: () => ({
    repositories: [] as Repository[],
    loading: false,
    loadingMore: {} as Record<string, boolean>, // Add individual loading states per language
    error: null as { message: string; code: number } | null,
    filters: {
      language: [''] as string[],
      fromDate: new Date(),
      toDate: new Date(),
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

    // New method for loading more repositories for a specific language
    async loadMore(language: string) {
      if (this.loadingMore[language] || this.pages.current > this.pages.total)
        return // Prevent multiple loads and check if more pages exist

      this.loadingMore[language] = true

      // Adjust filters for the specific language
      const newFilters = {
        ...this.filters,
        language: language, // Use the specific language
      }

      const { data, error } = await fetchRepositories(
        newFilters,
        this.pages.current,
      ) // Pass current page

      if (!error) {
        this.repositories.push(...data.items) // Append new data to the existing list
        this.pages.current += 1 // Increment the page for the next load
      }
      this.loadingMore[language] = false
      this.error = error
    },
  },
})

// import { defineStore } from 'pinia'
// import { fetchRepositories } from '@/http/api'
// import type { Repository } from '@/types/repositories'

// export const useRepositories = defineStore('repositories', {
//   state: () => ({
//     repositories: , // Stores repos per language
//     loading: false,
//     loadingMore: {} as Record<string, boolean>, // Add individual loading states per language
//     error: null as { message: string; code: number } | null,
//     filters: {
//       language: '',
//       fromDate: new Date(),
//       toDate: new Date(),
//       minStars: 0,
//     },
//   }),
//   actions: {
//     async getRepositories() {
//       this.loading = true
//       this.error = null

//       const { loading, data, error } = await fetchRepositories(this.filters)

//       this.loading = loading
//       this.repositories = data.items
//       this.error = error
//     },

//     async loadMore(language: string) {
//       // Set loading state for specific language
//       this.loadingMore[language] = true
//       try {
//         const nextPage = this.repositories[language].length / 30 + 1
//         const filters = { ...this.filters, language, page: nextPage }

//         const { data } = await fetchRepositories(filters)
//         if (data) {
//           this.repositories[language].push(...data) // Append new repos
//         }
//       } catch (err) {
//         this.error = { message: 'Error loading more', code: 500 }
//       } finally {
//         this.loadingMore[language] = false
//       }
//     },
//   },
// })
