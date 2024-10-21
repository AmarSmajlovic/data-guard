<template>
  <v-container fluid class="pa-0 ma-0">
    <v-row>
      <v-col cols="12" md="3">
        <SearchFilters />
      </v-col>
      <v-col cols="12" md="9">
        <RepoList />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import SearchFilters from '@/components/SearchFilters.vue'
import RepoList from '@/components/RepoList.vue'

import { useGitHubStore } from '@/stores/github'
import { onMounted } from 'vue'
import { useRepositories } from '@/stores/repositories'
import { getItemFromStorage } from '@/utils/storage'

const githubStore = useGitHubStore()
const repositoryStore = useRepositories()

onMounted(() => {
  const urlParams = new URLSearchParams(window.location.search)
  const accessToken = urlParams.get('access_token')

  if (accessToken) {
    githubStore.accessToken = accessToken
    window.history.replaceState({}, document.title, window.location.pathname)
  }

  const initialStore = getItemFromStorage('repositoriesStore')
  if (initialStore) {
    const parsed = JSON.parse(initialStore)
    if (parsed.repositories) {
      repositoryStore.repositories = parsed.repositories
    }
    if (parsed.filters) {
      repositoryStore.filters = parsed.filters
    }
    if (parsed.languageListScroll) {
      repositoryStore.languageListScroll = parsed.languageListScroll
    }
  }
})
</script>
