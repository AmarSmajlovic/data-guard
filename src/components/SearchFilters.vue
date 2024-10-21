<template>
  <v-card>
    <v-card-title>Filters</v-card-title>
    <v-card-text>
      <v-select
        v-model="store.filters.language"
        :items="languageOptions"
        label="Select languages"
        multiple
        closable-chips
        chips
        variant="solo"
      />
      <v-date-input label="From" prepend-icon="" v-model="filters.fromDate" />
      <v-date-input
        label="To"
        prepend-icon=""
        variant="solo"
        v-model="filters.toDate"
      />
      <v-text-field
        v-model="filters.minStars"
        label="With at least"
        type="number"
        variant="solo"
        :min="0"
      />
      <v-btn block class="flex-1" variant="tonal" @click="applyFilters"
        >Search selected filters</v-btn
      >
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useRepositories } from '@/stores/repositories'
import { languageOptions } from '@/constants'

const store = useRepositories()

const filters = computed(() => store.filters)

const applyFilters = () => {
  store.getRepositories()
}

onMounted(() => {
  store.getRepositories()
})
</script>

<style></style>
