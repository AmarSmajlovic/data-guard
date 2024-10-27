<template>
  <v-container class="pa-0">
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
import { onMounted, watch } from 'vue'
import { useRepositories } from '@/stores/repositories'
import { getItemFromStorage, setItemToLocalStorage } from '@/utils/storage'
import { getPlainStore } from '@/utils/repositories'

const githubStore = useGitHubStore()
const repositoryStore = useRepositories()
watch(
  () => repositoryStore,
  () => {
    if (repositoryStore) {
      const plainStore = getPlainStore(repositoryStore)

      const serializedStore = JSON.stringify(plainStore)
      setItemToLocalStorage('repositoriesStore', serializedStore)
    }
  },
  {
    deep: true,
  },
)
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
    if (parsed) {
      Object.assign(repositoryStore, parsed)
    }
  }
})
</script>
