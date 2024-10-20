<!-- <template >
  <v-sheet class="d-flex flex-row">
  <SidebarItem class="flex-1"/>
  <v-container class="flex-2">
    <h1>Repositories with 100+ Stars</h1>
    <p v-if="store.loading">Loading repositories...</p>
    <ul v-if="store.repositories.length && !store.loading">
      <li v-for="repo in store.repositories" :key="repo.id">
        {{ repo.name }} (★ {{ repo.stargazers_count }})
      </li>
    </ul>
    <p v-else-if="!store.loading">No repositories found.</p>
  </v-container>
  </v-sheet>
</template> -->

<template>
  <v-container fluid class="pa-0 ma-0">
    <v-row>
      <!-- For mobile and tablet, stack filters on top and repo list below -->
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
</script>
