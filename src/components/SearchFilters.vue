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
        variant="solo"
        append-inner-icon="mdi-star"
        :rules="[value => value >= 0 || 'Minimum value is 0']"
      />
      <v-btn block class="flex-1" variant="tonal" @click="applyFilters"
        >Search selected filters</v-btn
      >
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRepositories } from '@/stores/repositories'

const store = useRepositories()

const inputLanguage = ref('')
const selectedLanguages = ref<string[]>([])

const filters = computed(() => store.filters)

const addLanguage = () => {
  const language = inputLanguage.value.trim()
  if (language && !selectedLanguages.value.includes(language)) {
    selectedLanguages.value.push(language)
    inputLanguage.value = ''
  }
}

const removeLanguage = (index: number) => {
  selectedLanguages.value.splice(index, 1)
}

const applyFilters = () => {
  store.filters.language = selectedLanguages.value
  store.getRepositories()
}

onMounted(() => {
  store.getRepositories()
})
</script>

<style></style>
