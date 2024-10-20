<template>
  <v-card class="mb-4">
    <v-card-title>{{ props.language }}</v-card-title>
    <v-card-text
      style="max-height: 400px; overflow-y: auto"
      @scroll="handleScroll"
      :class="`scrollable-${props.language}`"
    >
      <v-list>
        <v-list-item v-for="repo in props.repositories" :key="repo.id">
          <RepoCard :repo="repo" />
        </v-list-item>
      </v-list>
    </v-card-text>
  </v-card>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue'
import RepoCard from '@/components/RepoCard.vue'
import type { Repository } from '@/types/repositories'
import { useRepositories } from '@/stores/repositories'

const props = defineProps<{
  language: string
  repositories: Repository[]
}>()

const store = useRepositories()

const handleScroll = () => {
  const container = document.querySelector(`.scrollable-${props.language}`)
  if (container) {
    const { scrollTop, scrollHeight, clientHeight } = container
    if (scrollTop >= (scrollHeight - clientHeight) / 2) {
      store.loadMore(props.language)
    }
  }
}
</script>

<style scoped></style>
