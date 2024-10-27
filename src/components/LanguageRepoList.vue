<template>
  <v-card
    class="mb-4 card-with-fade hover-card"
    @mouseover="hover = true"
    @mouseleave="hover = false"
  >
    <v-card-title>{{ props.language }}</v-card-title>
    <v-card-text
      class="scrollable-content"
      @scroll="handleScroll"
      :class="`scrollable-${sanitizeLanguage(props.language)}`"
    >
      <v-list>
        <v-list-item
          v-for="repo in props.repositories"
          :key="repo.id"
          :data-id="repo.id"
          class="item-card"
        >
          <RepoCard :repo="repo" />
        </v-list-item>
      </v-list>
    </v-card-text>
  </v-card>
</template>

<script lang="ts" setup>
import { defineProps, onMounted, ref } from 'vue'
import RepoCard from '@/components/RepoCard.vue'
import type { Repository } from '@/types/repositories'
import { useRepositories } from '@/stores/repositories'
import { sanitizeLanguage } from '@/utils/language'
import { getItemFromStorage } from '@/utils/storage'

const props = defineProps<{
  language: string
  repositories: Repository[]
}>()

const store = useRepositories()
const hover = ref(false)

const handleScroll = () => {
  const container = document.querySelector(
    `.scrollable-${sanitizeLanguage(props.language)}`,
  )
  if (container) {
    const { scrollTop, scrollHeight, clientHeight } = container

    const cards = container.querySelectorAll('.v-list-item')
    const threshold = clientHeight / 2
    cards.forEach(card => {
      const cardRect = card.getBoundingClientRect()
      if (cardRect.top >= 0 && cardRect.top <= threshold) {
        const cardId = card.getAttribute('data-id')
        if (cardId) {
          store.languageListScroll[props.language] = cardId
        }
      }
    })
    if (scrollTop >= (scrollHeight - clientHeight) / 2) {
      store.loadMore?.(props.language)
    }
  }
}

onMounted(() => {
  const container = document.querySelector(
    `.scrollable-${sanitizeLanguage(props.language)}`,
  )

  const initialStore = getItemFromStorage('repositoriesStore')
  if (container && initialStore) {
    const parsed = JSON.parse(initialStore)
    const cardId = parsed.languageListScroll[props.language]

    if (cardId) {
      const card = container.querySelector(`[data-id="${cardId}"]`)
      if (card) {
        card.scrollIntoView({ behavior: 'instant', block: 'start' })
      }
    }
  }
})
</script>

<style scoped>
.card-with-fade {
  position: relative;
  overflow: hidden;
  border: none;
  border-radius: 8px;
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
}

.v-theme--light .card-with-fade {
  box-shadow: 0 4px 8px rgba(51, 51, 51, 0.2);
}

.v-theme--dark .card-with-fade {
  box-shadow: 0 4px 8px rgba(245, 245, 245, 0.2);
}

.v-theme--light .card-with-fade:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 16px rgba(51, 51, 51, 0.3);
}

.v-theme--dark .card-with-fade:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 16px rgba(245, 245, 245, 0.3);
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

.item-card {
  padding: 0px !important;
}
</style>
