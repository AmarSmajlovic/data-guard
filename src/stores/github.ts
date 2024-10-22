import config from 'config'
import { getAccessToken, starRepository } from '@/http/github'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useGitHubStore = defineStore('github', () => {
  const accessToken = ref<string | null>(null)
  const errorMessage = ref<string | null>(null)

  const authorize = async (code: string) => {
    try {
      accessToken.value = await getAccessToken(code)
      errorMessage.value = null
    } catch (error: unknown) {
      if (error instanceof Error) errorMessage.value = error.message
    }
  }

  const starRepo = async (repoFullName: string) => {
    if (!accessToken.value) {
      const clientId = config.GITHUB_CLIENT_ID
      const redirectUri = `${window.location.origin}/api/github-auth`
      const githubAuthorizeUrl = `${config.GITHUB_BASE_URL}/login/oauth/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=repo`
      return (window.location.href = githubAuthorizeUrl)
    }

    try {
      await starRepository(repoFullName, accessToken.value)
      errorMessage.value = null
    } catch (error: unknown) {
      if (error instanceof Error) errorMessage.value = error.message
    }
  }

  return {
    accessToken,
    errorMessage,
    authorize,
    starRepo,
  }
})
