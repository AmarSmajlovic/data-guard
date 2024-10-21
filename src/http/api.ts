import config from '@/config'
import type { FetchResponse } from '@/types/client'
import type { Filters, RepositoriesResponse } from '@/types/repositories'
import { formatDate } from '@/utils/date'

export const fetchRepositories = async (
  filters: Filters,
  page: number = 1,
): Promise<FetchResponse<RepositoriesResponse>> => {
  const api = `${config.GITHUB_BASE_API_URL}/search/repositories`

  let loading = true
  let data: RepositoriesResponse = {
    total_count: 0,
    incomplete_results: false,
    items: [],
  }
  let error: { message: string; code: number } | null = null

  const { language, minStars, toDate, fromDate } = filters

  const queryParts: string[] = []

  if (minStars) {
    queryParts.push(`stars:>=${minStars}`)
  }

  if (language) {
    queryParts.push(`language:${language}`)
  }

  if (fromDate && toDate) {
    const formattedFromDate = formatDate(fromDate)
    const formattedToDate = formatDate(toDate)
    queryParts.push(`created:${formattedFromDate}..${formattedToDate}`)
  } else if (fromDate) {
    const formattedFromDate = formatDate(fromDate)
    queryParts.push(`created:>=${formattedFromDate}`)
  } else if (toDate) {
    const formattedToDate = formatDate(toDate)
    queryParts.push(`created:<=${formattedToDate}`)
  }

  const query = queryParts.join(' ')

  try {
    const response = await fetch(
      `${api}?q=${encodeURIComponent(query)}&page=${page}&per_page=30`,
    )
    if (!response.ok) throw new Error('Something went wrong, please try again.')

    const result = await response.json()
    data = result
  } catch (err: unknown) {
    if (err instanceof Error) {
      error = { message: err.message, code: 500 }
    } else {
      error = { message: 'Unknown error occurred', code: 500 }
    }
  } finally {
    loading = false
  }

  return { loading, data, error }
}
