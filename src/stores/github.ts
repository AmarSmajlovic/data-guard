import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getAccessToken, starRepository, checkIfStarred } from '@/http/github'

export const useGitHubStore = defineStore('github', () => {
  const accessToken = ref<string | null>(null)
  const errorMessage = ref<string | null>(null)
  const loading = ref<boolean>(false)

  const authorize = async (code: string) => {
    loading.value = true
    errorMessage.value = null

    const { data, error } = await getAccessToken(code)

    if (error) {
      errorMessage.value = error.message
    } else {
      accessToken.value = data
    }

    loading.value = false
  }

  const starRepo = async (repoFullName: string) => {
    if (!accessToken.value) {
      const clientId = 'Ov23liu77XGEEac2QoSR'
      const redirectUri = `${window.location.origin}/api/github-auth`
      const githubAuthorizeUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=repo`
      window.location.href = githubAuthorizeUrl
      return
    }

    loading.value = true
    errorMessage.value = null

    const { error } = await starRepository(repoFullName, accessToken.value)

    if (error) {
      errorMessage.value = error.message
    }

    loading.value = false
  }

  const checkStarredStatus = async (repoFullName: string) => {
    if (!accessToken.value) return false

    loading.value = true
    errorMessage.value = null

    const { data, error } = await checkIfStarred(
      repoFullName,
      accessToken.value,
    )

    if (error) {
      errorMessage.value = error.message
    }

    loading.value = false

    return data || false
  }

  return {
    accessToken,
    errorMessage,
    loading,
    authorize,
    starRepo,
    checkStarredStatus,
  }
})
