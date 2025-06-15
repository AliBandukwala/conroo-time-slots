<script setup lang="ts">
import type { TimeSlot } from '../../features/timeSlots/models/timeSlots.model'

defineProps<{ slot: TimeSlot }>()

function getStartTime(slot: any): string {
  return slot.start_time || slot.startTime || ''
}

function getEndTime(slot: any): string {
  return slot.end_time || slot.endTime  || ''
}

function getCurrentCapacity(slot: any): number {
  return slot.capacity.current_capacity ?? 0
}

function getPercentage(slot: any): number {
  return Math.round((getCurrentCapacity(slot) / 50) * 100)
}

function formatTime(dateStr: string): string {
  return new Date(dateStr).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}
</script>

<template>
  <v-card 
    :color="slot.category || 'grey'" 
    class="pa-4 text-white rounded-lg elevation-4"
    :aria-label="`Time slot from ${formatTime(getStartTime(slot))} to ${formatTime(getEndTime(slot))}`"
    role="region"
    >
    <v-card-title class="text-h5">
      {{ formatTime(getStartTime(slot)) }} - {{ formatTime(getEndTime(slot)) }}
    </v-card-title>

    <v-card-subtitle class="text-caption mb-2">
      Capacity: {{ getCurrentCapacity(slot) }} / 50 ({{ getPercentage(slot) }}%)
    </v-card-subtitle>

    <v-progress-linear
      :model-value="getCurrentCapacity(slot)"
      :max="50"
      color="white"
      height="6"
      rounded
      class="mb-1"
      :aria-label="`Capacity usage: ${getCurrentCapacity(slot)} out of 50`"
    />
  </v-card>
</template>

<style scoped>
.v-card-title {
  font-size: 1rem;
}

@media (min-width: 600px) {
  .v-card-title {
    font-size: 1.1rem;
  }
}
</style>
