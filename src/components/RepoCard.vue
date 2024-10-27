<template>
  <v-card class="mb-4 parent-card" max-width="400px">
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

    <v-card-text>
      <p>{{ repo.description || 'No description provided.' }}</p>
    </v-card-text>

    <v-card-subtitle>
      <transition name="scale">
        <v-icon
          :class="{ 'gold-star': isAnimating }"
          @click="handleStarClick"
          v-if="starCount >= 0"
        >
          mdi-star
        </v-icon>
      </transition>
      <span class="mx-2">{{ starCount }} Stars</span>
    </v-card-subtitle>
    <v-card-actions class="flex flex-column">
      <v-btn
        @click="handleStarClick"
        block
        class="custom-btn"
        append-icon="mdi-star"
      >
        Add Star
      </v-btn>
      <v-btn :href="repo.html_url" target="_blank" block class="custom-btn">
        View on GitHub
      </v-btn>
    </v-card-actions>
  </v-card>

  <v-snackbar v-model="snackbar.isOpen" :color="snackbar.color">
    {{ snackbar.message }}
    <v-btn color="white" @click="snackbar.isOpen = false">Close</v-btn>
  </v-snackbar>
</template>

<script setup lang="ts">
import { checkIfStarred } from '@/http/github'
import { useGitHubStore } from '@/stores/github'
import { useRepositories } from '@/stores/repositories'
import type { Repository } from '@/types/repositories'
import { ref, onMounted } from 'vue'

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
  color: 'success',
})
const starred = ref(false)

const checkStarredStatus = async () => {
  starred.value = await checkIfStarred(
    props.repo.full_name,
    githubStore.accessToken,
  )
}

onMounted(() => {
  checkStarredStatus()
})

const handleStarClick = async () => {
  if (starred.value) {
    snackbar.value.isOpen = true
    snackbar.value.color = 'primary'
    snackbar.value.message = 'You already starred this repo.'
    return
  }

  await githubStore.starRepo(props.repo.full_name)
  if (githubStore.accessToken) {
    starCount.value++
    isAnimating.value = true
    starred.value = true // Set starred to true

    setTimeout(() => {
      isAnimating.value = false
    }, 300)

    snackbar.value.isOpen = true
    snackbar.value.color = 'success'
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
.parent-card {
  box-shadow: none;
  padding: 0 !important;
}

.v-card {
  box-shadow: 0 4px 8px var(--v-surface-base);
  border-radius: 4px;
  margin-bottom: 0;
}

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

.v-list-item {
  padding: 0 !important;
}

.custom-btn {
  width: 100%;
  background-color: #1976d2;
  color: white;
  border-radius: 4px;
  transition: background-color 0.3s ease;
}

.custom-btn:hover {
  background-color: #155a8a;
}
</style>
