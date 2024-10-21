import config from '@/config'
import axios from 'axios'

export const getAccessToken = async (code: string): Promise<string> => {
  const response = await axios.post('/api/auth/github', { code })
  return response.data.access_token
}

export const starRepository = async (
  repoFullName: string,
  accessToken: string,
): Promise<void> => {
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
}

export const checkIfStarred = async (
  repoFullName: string,
  accessToken: string | null,
): Promise<boolean> => {
  try {
    const response = await axios.get(
      `https://api.github.com/user/starred/${repoFullName}`,
      {
        headers: {
          Authorization: `token ${accessToken}`,
        },
      },
    )
    return response.status === 204
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error.response && error.response.status === 404) {
      return false
    }
    console.error('Error checking star status:', error)
    return false
  }
}