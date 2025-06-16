<script setup lang="ts">
import { onMounted, onUnmounted, computed, ref } from 'vue'
import { useTimeSlotStore } from '@/features/timeSlots/stores/timeSlots.store'
import { storeToRefs } from 'pinia'
import { fetchTimeSlots, subscribeToUpdates } from '@/api/timeSlots'
import TimeSlotCard from '@/core/components/TimeSlotCard.vue'
import type { TimeSlot } from '@/features/timeSlots/models/timeSlots.model'

const store = useTimeSlotStore()
const { timeSlots, isLoading, error } = storeToRefs(store)

let eventSource: EventSource | null = null

// filters
const showOnlyGreen = ref(false)

/* In real app, send to analytics service */
function trackEvent(event: string, payload: any) {
  console.log(`[trackEvent] ${event}`, payload)
}

onMounted(async () => {
  try {
    const data = await fetchTimeSlots()
    store.setTimeSlots(data)
    eventSource = subscribeToUpdates((update) => {
      try {
        store.updateTimeSlot(update)
        trackEvent('slot_updated', update)
      } catch (err) {
        store.setError('Failed to process update.')
        console.error(err)
      }
    })
    eventSource.onerror = () => {
      store.setError('Live updates connection lost. Please refresh.')
    }
  } catch (err) {
    store.setError('Failed to load time slots. Please try again.')
    console.error(err)
  }
})

onUnmounted(() => {
  eventSource?.close()
})

// formate date to be displayed above the date wise grouped slots
function formatDate(dateStr: string): string {
  const d = new Date(dateStr)
  const options: Intl.DateTimeFormatOptions = { weekday: 'long', day: 'numeric', month: 'short', year: 'numeric' }
  const parts = new Intl.DateTimeFormat(undefined, options).formatToParts(d)
  const map = Object.fromEntries(parts.map(p => [p.type, p.value]))

  return `${map.weekday}, ${map.day} ${map.month}, ${map.year}`
}

// method to group slots by dates
const groupedByDate = computed(() => {
  const map: Record<string, TimeSlot[]> = {}

  for (const slot of timeSlots.value) {
    const time = slot.start_time || ''
    const date = new Date(time).toISOString().split('T')[0]

    if (showOnlyGreen.value && slot.category !== 'green') continue

    if (!map[date]) map[date] = []
    map[date].push(slot)
  }

  return map
})
</script>

<template>
  <!-- show error message if there is one -->
  <v-alert v-if="error" type="error" variant="tonal" class="mb-4">
    {{ error }}
  </v-alert>

  <v-container>
    <!-- If loading, show skeletons -->
    <template v-if="isLoading">
      <v-row dense>
        <v-col v-for="n in 6" :key="n" cols="12" sm="6" md="4">
          <v-skeleton-loader
            type="card"
            elevation="2"
            class="rounded-lg mb-4"
            :loading="true"
          />
        </v-col>
      </v-row>
    </template>

    <!-- If loaded, show animated cards -->
    <template v-else>
      <!-- Filters -->
      <v-switch
        v-model="showOnlyGreen"
        color="primary"
        label="Show only available (green)"
        class="mt-4"
        inset
      />

       <!-- Main section -->
      <div v-for="(groupedSlots, date) in groupedByDate" :key="date" class="mb-6">
        <h2 class="text-h6 font-weight-bold mb-2">
          <v-icon left class="mr-1">mdi-calendar</v-icon>{{ formatDate(date) }}
        </h2>
        
        <v-row dense>
          <v-col
            v-for="slot in groupedSlots"
            :key="slot.id"
            cols="12"
            sm="6"
            md="4"
            lg="3"
          >
            <TimeSlotCard :slot="slot" />
          </v-col>
        </v-row>
      </div>
    </template>
  </v-container>
</template>

<style scoped>
h2 {
  font-family: 'Segoe UI', Roboto, sans-serif;
}
</style>
