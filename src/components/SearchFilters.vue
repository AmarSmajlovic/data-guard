<template>
  <v-card>
    <v-card-title>Filters</v-card-title>
    <v-form ref="inputForm">
      <v-select
        v-model="filters.language"
        :items="languageOptions"
        label="Select languages"
        multiple
        closable-chips
        chips
        variant="solo"
      />
      <v-date-input
        label="From"
        prepend-icon=""
        v-model="filters.fromDate"
        :rules="[value => fromDateRule(value, filters.toDate)]"
      />
      <v-date-input
        label="To"
        prepend-icon=""
        v-model="filters.toDate"
        :rules="[value => toDateRule(value, filters.fromDate)]"
      />
      <v-text-field
        v-model="filters.minStars"
        label="With at least"
        type="number"
        variant="solo"
        :min="0"
      />
      <v-btn
        :disabled="
          !(
            fromDateRule(filters.fromDate, filters.toDate) === true &&
            toDateRule(filters.toDate, filters.fromDate) === true
          )
        "
        block
        class="flex-1"
        variant="tonal"
        @click="store.getRepositories"
      >
        Search selected filters
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

<style></style>
