<template>
  <v-card height="100vh">
    <v-card-title>GitHub repositories</v-card-title>
    <v-card-text>
      <v-row>
        <template v-if="loading">
          <v-col v-for="n in 6" :key="n" cols="12" sm="4">
            <v-card>
              <v-skeleton-loader type="card" height="300"></v-skeleton-loader>
              <v-skeleton-loader
                type="paragraph"
                height="178"
              ></v-skeleton-loader>
            </v-card>
          </v-col>
        </template>

        <template v-else>
          <v-col
            v-for="(repos, language) in repositories"
            :key="language"
            cols="12"
            sm="4"
          >
            <LanguageRepoList :language="language" :repositories="repos" />
          </v-col>
        </template>
      </v-row>

      <v-container
        fluid
        v-if="error"
        class="d-flex align-center justify-center"
        style="height: 300px"
      >
        <div class="text-h5 text-center">Oops..! {{ error.message }}</div>
      </v-container>
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
