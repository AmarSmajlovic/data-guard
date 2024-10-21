/* eslint-disable @typescript-eslint/no-explicit-any */
import { getAccessToken, starRepository } from '@/http/github'
import type { Filters } from '@/types/repositories'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useGitHubStore = defineStore('github', () => {
  const accessToken = ref<string | null>(null)
  const errorMessage = ref<string | null>(null)

  const authorize = async (code: string) => {
    try {
      accessToken.value = await getAccessToken(code)
      errorMessage.value = null
    } catch (error: any) {
      errorMessage.value = error.message
    }
  }

  const starRepo = async (repoFullName: string, filters: Filters) => {
    if (!accessToken.value) {
      const clientId = 'Ov23liu77XGEEac2QoSR'
      const redirectUri = `${window.location.origin}/api/github-auth`
      const filterString = encodeURIComponent(JSON.stringify(filters))
      const githubAuthorizeUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=repo&filters=${filterString}`
      return (window.location.href = githubAuthorizeUrl)
    }

    try {
      await starRepository(repoFullName, accessToken.value)
      errorMessage.value = null
    } catch (error: any) {
      errorMessage.value = error.message
    }
  }

  return {
    accessToken,
    errorMessage,
    authorize,
    starRepo,
  }
})
