<template>
  <v-container fluid class="pa-0 ma-0">
    <v-row>
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
