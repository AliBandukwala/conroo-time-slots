import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { TimeSlot } from '../models/timeSlots.model'

export const useTimeSlotStore = defineStore('timeSlots', () => {
  // Reactive state
  const timeSlots = ref<TimeSlot[]>([])
  const isLoading = ref(true)
  const error = ref<string | null>(null)

  // Set all time slots
  const setTimeSlots = (data: TimeSlot[]) => {
    timeSlots.value = data
    isLoading.value = false
    error.value = null
  }

  // Handle updates from SSE
  const updateTimeSlot = (update: { id: number; currentCapacity: number; category: string }) => {
    const slot = timeSlots.value.find((s: TimeSlot) => s.id === update.id)
    if (slot) {
      slot.category = update.category as 'green' | 'yellow' | 'red'
      if (slot.capacity.current_capacity !== undefined) {
        slot.capacity.current_capacity = update.currentCapacity
      } else if (slot.capacity.current !== undefined) {
        slot.capacity.current = update.currentCapacity
      }
    }
  }

  const setError = (msg: string) => {
    error.value = msg
  }

  const clearError = () => {
    error.value = null
  }

  // Expose state and actions
  return {
    timeSlots,
    isLoading,
    error,
    setTimeSlots,
    updateTimeSlot,
    setError,
    clearError
  }
})
