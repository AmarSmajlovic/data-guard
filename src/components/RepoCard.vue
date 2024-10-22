<template>
  <v-card max-width="400px">
    <v-card-title>
      <v-list-item-avatar size="30" class="avatar-small">
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

    <v-card-subtitle class="d-flex justify-center">
      <transition name="scale">
        <v-icon
          :class="{ 'gold-star': isAnimating }"
          @click="handleStarClick"
          v-if="starCount >= 0"
          >mdi-star</v-icon
        >
      </transition>
      <span class="mx-2">{{ starCount }} Stars</span>
    </v-card-subtitle>
    <v-card-text>
      <p>{{ repo.description || 'No description provided.' }}</p>
    </v-card-text>

    <v-card-subtitle class="d-flex justify-center">
      <v-btn
        @click="handleStarClick"
        block
        color="primary"
        append-icon="mdi-star"
        >Add star</v-btn
      >
    </v-card-subtitle>
    <v-card-actions>
      <v-btn :href="repo.html_url" target="_blank" block color="primary">
        View on GitHub
      </v-btn>
    </v-card-actions>
  </v-card>
  <v-snackbar v-model="snackbar.isOpen" color="success">
    {{ snackbar.message }}
    <v-btn color="white" @click="snackbar.isOpen = false">Close</v-btn>
  </v-snackbar>
</template>

<script setup lang="ts">
import { checkIfStarred } from '@/http/github'
import { useGitHubStore } from '@/stores/github'
import { useRepositories } from '@/stores/repositories'
import type { Repository } from '@/types/repositories'
import { ref } from 'vue'

const props = defineProps<{
  repo: Repository
}>()

const githubStore = useGitHubStore()
const repositoriesStore = useRepositories()
const starCount = ref(props.repo.stargazers_count)
const isAnimating = ref(false)
const snackbar = ref({
  isOpen: false,
  message: '',
})

const handleStarClick = async () => {
  const isStarred = await checkIfStarred(
    props.repo.full_name,
    githubStore.accessToken,
  )

  if (isStarred) {
    snackbar.value.isOpen = true
    snackbar.value.message = 'You already starred this repo.'
    return
  }

  await githubStore.starRepo(props.repo.full_name)
  if (githubStore.accessToken) {
    starCount.value++
    isAnimating.value = true

    setTimeout(() => {
      isAnimating.value = false
    }, 300)

    snackbar.value.isOpen = true
    snackbar.value.message = `Congrats! You starred the ${props.repo.name} repo`

    const repoToUpdate = repositoriesStore.repositories.find(
      repo => repo.id === props.repo.id,
    )

    if (repoToUpdate) {
      repoToUpdate.stargazers_count++
    }
  }
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
