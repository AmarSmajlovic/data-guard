<template>
  <v-card>
    <v-card-title>GitHub repositories</v-card-title>
    <v-card-text>
      <v-row>
        <v-col
          v-for="(repos, language) in repositories"
          :key="language"
          cols="12"
          sm="4"
        >
          <v-card v-if="loading">
            <v-skeleton-loader type="card" height="300"></v-skeleton-loader>
            <v-skeleton-loader
              type="paragraph"
              height="178"
            ></v-skeleton-loader>
          </v-card>

          <template v-else>
            <LanguageRepoList :language="language" :repositories="repos" />
          </template>
        </v-col>
      </v-row>
      <p v-if="error">{{ error.message }}</p>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRepositories } from '@/stores/repositories'
import LanguageRepoList from '@/components/LanguageRepoList.vue'
import { mapRepositories } from '@/utils/repositories'

const store = useRepositories()
const repositories = computed(() => mapRepositories(store.repositories))
const loading = computed(() => store.loading)
const error = computed(() => store.error)
</script>

<style scoped></style>
