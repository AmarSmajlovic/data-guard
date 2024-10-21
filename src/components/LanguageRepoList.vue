<template>
  <v-card class="mb-4 card-with-fade">
    <v-card-title>{{ props.language }}</v-card-title>
    <v-card-text
      class="scrollable-content"
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

<style scoped>
.card-with-fade {
  position: relative;
  overflow: hidden;
}

.scrollable-content {
  max-height: 400px;
  overflow-y: auto;
  padding-bottom: 20px;
}

.card-with-fade::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 40px;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.1));
  pointer-events: none;
}
</style>
