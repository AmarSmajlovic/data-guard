import type { RepositoriesResponse } from '@/types/repositories'
import { formatDate } from '@/utils/date'

export interface FetchResponse<T> {
  loading: boolean
  data: T
  error: { message: string; code: number } | null
}

export interface Filters {
  language: string | string[]
  minStars: number
  fromDate: Date
  toDate: Date
}

export const fetchRepositories = async (
  filters: Filters,
  page: number = 1,
): Promise<FetchResponse<RepositoriesResponse>> => {
  const api = 'https://api.github.com/search/repositories'

  // Initialize loading and error variables
  let loading = true
  let data: RepositoriesResponse = {
    total_count: 0,
    incomplete_results: false,
    items: [],
  }
  let error: { message: string; code: number } | null = null

  const { language, minStars, toDate, fromDate } = filters

  // Construct the query string based on filters
  let query = `stars:>=${minStars} ${language ? `language:${language}` : ''}`

  // Add date filters if specified, and ensure they're in YYYY-MM-DD format
  if (fromDate) {
    query += ` created:>=${formatDate(fromDate)}`
  }
  if (toDate) {
    query += ` created:<=${formatDate(toDate)}`
  }

  try {
    const response = await fetch(`${api}?q=${query}&page=${page}&per_page=30`)
    if (!response.ok) throw new Error('Network response was not ok')

    const result = await response.json()
    data = result // Assume result.items contains the repositories
  } catch (err: unknown) {
    if (err instanceof Error) {
      error = { message: err.message, code: 500 } // Customize error handling here
    } else {
      error = { message: 'Unknown error occurred', code: 500 }
    }
  } finally {
    loading = false // Set loading to false when done
  }

  // Return the response with the loading state
  return { loading, data, error }
}
