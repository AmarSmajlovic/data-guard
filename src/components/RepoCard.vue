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
      <v-icon>mdi-star</v-icon>
      {{ repo.stargazers_count }} Stars
    </v-card-subtitle>

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

<script lang="ts">
import type { Repository } from '@/types/repositories'

export default {
  props: {
    repo: {
      type: Object as () => Repository,
      required: true,
    },
  },
}
</script>

<style scoped></style>
