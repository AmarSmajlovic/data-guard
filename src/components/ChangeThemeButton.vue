<template>
  <v-btn
    style="z-index: 10"
    :variant="!theme.global.current.value.dark ? 'elevated' : 'tonal'"
    :color="!theme.global.current.value.dark ? 'black' : 'white'"
    @click="toggleTheme"
  >
    <i
      :class="theme.global.current.value.dark ? 'fas fa-sun' : 'fas fa-moon'"
    ></i>
  </v-btn>
</template>

<script setup lang="ts">
import { useTheme } from 'vuetify'

const theme = useTheme()

function toggleTheme() {
  theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
}
</script>

<style></style>
