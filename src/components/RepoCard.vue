<template>
  <v-card>
    <v-card-title>
      <v-list-item-avatar size="40">
        <v-img
          :src="repo.owner.avatar_url"
          alt="Owner Avatar"
          class="rounded-circle"
        />
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title>{{ repo.name }}</v-list-item-title>
        <v-list-item-subtitle>
          Created on: {{ new Date(repo.created_at).toLocaleDateString() }}
        </v-list-item-subtitle>
      </v-list-item-content>
    </v-card-title>

    <v-card-subtitle>
      <transition name="scale">
        <v-icon
          :class="{ 'gold-star': isAnimating }"
          @click="handleStarClick"
          v-if="starCount >= 0"
          >mdi-star</v-icon
        >
      </transition>
      {{ starCount }} Stars
    </v-card-subtitle>
    <v-btn @click="handleStarClick">Add star</v-btn>

    <v-card-text>
      <p>{{ repo.description || 'No description provided.' }}</p>
    </v-card-text>

    <v-card-actions>
      <v-btn :href="repo.html_url" target="_blank" toned color="primary">
        View on GitHub
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
import { checkIfStarred } from '@/http/github'
import { useGitHubStore } from '@/stores/github'
import type { Repository } from '@/types/repositories'
import { ref } from 'vue'

const props = defineProps<{
  repo: Repository
}>()

const githubStore = useGitHubStore()
const starCount = ref(props.repo.stargazers_count)
const isAnimating = ref(false)

const handleStarClick = async () => {
  const isStarred = await checkIfStarred(
    props.repo.full_name,
    githubStore.accessToken,
  )
  if (isStarred) {
    return alert('Already starred')
  }
  await githubStore.starRepo(props.repo.full_name)
  starCount.value++
  isAnimating.value = true
  setTimeout(() => {
    isAnimating.value = false
  }, 300)
}
</script>

<style scoped>
.gold-star {
  color: gold;
}

.scale-enter-active,
.scale-leave-active {
  transition: transform 0.3s;
}

.scale-enter,
.scale-leave-to {
  transform: scale(1.7);
}
</style>
