<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-toolbar-title>Conroo Time Slots</v-toolbar-title>
      <v-spacer />
      <v-btn icon @click="toggleTheme" :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'">
        <v-icon>{{ isDark ? 'mdi-weather-sunny' : 'mdi-weather-night' }}</v-icon>
      </v-btn>
    </v-app-bar>
    
    <v-main app>
      <v-container>
        <TimeSlotList />
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { useTheme } from 'vuetify'
import { computed } from 'vue'
import TimeSlotList from '@/features/timeSlots/views/TimeSlotsList.vue'

const theme = useTheme()

const isDark = computed(() => theme.global.name.value === 'dark')

function toggleTheme() {
  theme.global.name.value = isDark.value ? 'light' : 'dark'
  localStorage.setItem('theme', theme.global.name.value)
}
</script>
