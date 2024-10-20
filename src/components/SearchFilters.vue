<template>
  <v-card>
    <v-card-title>Filters</v-card-title>
    <v-card-text>
      <div class="d-flex flex-wrap mb-2">
        <v-chip
          v-for="(language, index) in selectedLanguages"
          :key="index"
          closable
          @click:close="removeLanguage(index)"
          class="mr-1"
        >
          {{ language }}
        </v-chip>
      </div>
      <v-text-field
        v-model="inputLanguage"
        label="Language"
        @keyup.enter="addLanguage"
        clearable
        @click:append="addLanguage"
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
      />
      <v-btn @click="applyFilters">Search selected filters</v-btn>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRepositories } from '@/stores/repositories'

const store = useRepositories()

const inputLanguage = ref('')
const selectedLanguages = ref<string[]>([])

const filters = computed(() => store.filters)

// Function to add language
const addLanguage = () => {
  const language = inputLanguage.value.trim() // Get the trimmed input value
  if (language && !selectedLanguages.value.includes(language)) {
    selectedLanguages.value.push(language) // Add language if it's not already in the array
    inputLanguage.value = '' // Clear the input field
  }
}

// Function to remove a language
const removeLanguage = (index: number) => {
  selectedLanguages.value.splice(index, 1) // Remove language at the given index
}

// Function to apply filters
const applyFilters = () => {
  store.filters.language = selectedLanguages.value // Update store with selected languages
  store.getRepositories() // Fetch repositories based on filters
}
</script>

<style>
/* Optional custom styles can be added here */
</style>
