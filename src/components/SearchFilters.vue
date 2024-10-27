<template>
  <v-card class="filter-card">
    <v-card-title class="d-flex justify-space-between align-center">
      <span>Filters</span>
      <ChangeThemeButton />
    </v-card-title>
    <v-form ref="inputForm">
      <v-select
        v-model="filters.language"
        :items="languageOptions"
        label="Select languages"
        multiple
        closable-chips
        chips
        variant="solo"
        class="input-field rounded-field"
      />
      <v-date-input
        label="From"
        prepend-icon=""
        v-model="filters.fromDate"
        :rules="[value => fromDateRule(value, filters.toDate)]"
        class="input-field rounded-field"
      />
      <v-date-input
        label="To"
        prepend-icon=""
        v-model="filters.toDate"
        :rules="[value => toDateRule(value, filters.fromDate)]"
        class="input-field rounded-field"
      />
      <v-text-field
        v-model="filters.minStars"
        label="With at least"
        type="number"
        variant="solo"
        :min="0"
        class="input-field rounded-field"
      />
      <v-btn
        :disabled="
          !(
            fromDateRule(filters.fromDate, filters.toDate) === true &&
            toDateRule(filters.toDate, filters.fromDate) === true
          )
        "
        block
        class="search-button"
        variant="tonal"
        @click="store.getRepositories"
      >
        Search
      </v-btn>
    </v-form>
  </v-card>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { useRepositories } from '@/stores/repositories'
import { languageOptions } from '@/constants'
import { fromDateRule, toDateRule } from '@/validations/repoFilters'
import type { VForm } from 'vuetify/components'
import type { Filters } from '@/types/repositories'
import { getItemFromStorage } from '@/utils/storage'
import ChangeThemeButton from '@/components/ChangeThemeButton.vue'

const store = useRepositories()
const filters = computed(() => store.filters)

const inputForm = ref<VForm & Filters>({} as VForm & Filters)

watch(
  () => filters.value.fromDate,
  () => inputForm.value.validate(),
)

watch(
  () => filters.value.toDate,
  () => inputForm.value.validate(),
)

onMounted(() => {
  const initialStore = getItemFromStorage('repositoriesStore')
  if (!initialStore) store.getRepositories?.()
})
</script>

<style scoped>
.filter-card {
  border-radius: 16px;
  padding: 20px;
  border: 1px solid var(--v-divider);
  box-shadow:
    0 4px 8px rgba(0, 0, 0, 0.1),
    0 6px 20px rgba(0, 0, 0, 0.1);
  transition:
    box-shadow 0.3s ease,
    transform 0.3s ease;
}

.filter-card:hover {
  box-shadow:
    0 8px 16px rgba(0, 0, 0, 0.2),
    0 12px 40px rgba(0, 0, 0, 0.2);
}

.input-field {
  margin-bottom: 16px;
  background-color: var(--v-surface-card);
  border-radius: 24px;
  box-shadow: none;
}

.v-input__control {
  border: none;
  box-shadow: none;
}

.search-button {
  background-color: var(--v-primary-base);
  color: var(--v-primary-text);
  font-weight: bold;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition:
    box-shadow 0.2s ease,
    transform 0.2s ease;
}

.search-button:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  transform: translateY(-2px);
}

.search-button:disabled {
  background-color: var(--v-grey-lighten2);
  color: var(--v-grey-darken2);
  box-shadow: none;
}
</style>
