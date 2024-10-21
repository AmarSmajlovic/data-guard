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

const githubStore = useGitHubStore()
const repositoryStore = useRepositories()

onMounted(() => {
  const urlParams = new URLSearchParams(window.location.search)
  const accessToken = urlParams.get('access_token')

  if (accessToken) {
    githubStore.accessToken = accessToken
    window.history.replaceState({}, document.title, window.location.pathname)
  }

  const cookieFilters = document.cookie
    .split('; ')
    .find(row => row.startsWith('filters='))

  if (cookieFilters) {
    const filters = decodeURIComponent(cookieFilters.split('=')[1])
    repositoryStore.filters = JSON.parse(filters)
  }
})
</script>
