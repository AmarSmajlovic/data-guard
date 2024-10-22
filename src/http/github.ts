import axios from 'axios'
import config from '@/config'
import type { FetchResponse } from '@/types/client'

export const getAccessToken = async (
  code: string,
): Promise<FetchResponse<string | null>> => {
  let data: string | null = null
  let error: { message: string; code: number } | null = null
  let loading = true

  try {
    const response = await axios.post('/api/auth/github', { code })
    data = response.data.access_token
  } catch (err: unknown) {
    if (err instanceof Error) {
      error = { message: err.message, code: 500 }
    } else {
      error = { message: 'Unknown error occurred', code: 500 }
    }
  } finally {
    loading = false
  }

  return { data, error, loading }
}

export const starRepository = async (
  repoFullName: string,
  accessToken: string,
): Promise<FetchResponse<void | null>> => {
  let data: void | null = null
  let error: { message: string; code: number } | null = null
  let loading = true

  try {
    await axios.put(
      `${config.GITHUB_BASE_API_URL}/user/starred/${repoFullName}`,
      {},
      {
        headers: {
          Authorization: `token ${accessToken}`,
          Accept: 'application/vnd.github.v3.star+json',
        },
      },
    )
    data = undefined
  } catch (err: unknown) {
    if (err instanceof Error) {
      error = { message: err.message, code: 500 }
    } else {
      error = { message: 'Unknown error occurred', code: 500 }
    }
  } finally {
    loading = false
  }

  return { data, error, loading }
}

export const checkIfStarred = async (
  repoFullName: string,
  accessToken: string | null,
): Promise<FetchResponse<boolean | null>> => {
  let data: boolean | null = null
  let error: { message: string; code: number } | null = null
  let loading = true

  try {
    const response = await axios.get(
      `${config.GITHUB_BASE_API_URL}/user/starred/${repoFullName}`,
      {
        headers: {
          Authorization: `token ${accessToken}`,
        },
      },
    )
    data = response.status === 204
  } catch (err: unknown) {
    if (axios.isAxiosError(err) && err.response?.status === 404) {
      data = false
    } else {
      if (err instanceof Error) {
        error = { message: err.message, code: 500 }
      } else {
        error = { message: 'Unknown error occurred', code: 500 }
      }
    }
  } finally {
    loading = false
  }

  return { data, error, loading }
}
