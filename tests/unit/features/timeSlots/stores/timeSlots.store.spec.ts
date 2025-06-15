import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useTimeSlotStore } from '@/features/timeSlots/stores/timeSlots.store'
import type { TimeSlot } from '@/features/timeSlots/models/timeSlots.model'

describe('useTimeSlotStore (Composition API)', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('sets initial time slots', () => {
    const store = useTimeSlotStore()

    const mockSlots: TimeSlot[] = [
      {
        id: 1,
        start_time: '2024-07-23T08:00:00',
        end_time: '2024-07-23T08:30:00',
        category: 'yellow',
        capacity: { current_capacity: 20, max_capacity: 50 }
      }
    ]

    store.setTimeSlots(mockSlots)
    expect(store.timeSlots.length).toBe(1)
    expect(store.timeSlots[0].category).toBe('yellow')
    expect(store.error).toBeNull() // ✅ error should be cleared on success
  })

  it('updates a time slot correctly', () => {
    const store = useTimeSlotStore()
    store.setTimeSlots([
      {
        id: 1,
        category: 'green',
        capacity: { current_capacity: 10, max_capacity: 50 }
      } as TimeSlot
    ])

    store.updateTimeSlot({ id: 1, currentCapacity: 30, category: 'red' })

    const slot = store.timeSlots[0]
    expect(slot.category).toBe('red')
    expect(slot.capacity.current_capacity).toBe(30)
  })

  it('sets an error message', () => {
    const store = useTimeSlotStore()

    store.setError('Something went wrong')
    expect(store.error).toBe('Something went wrong')
  })

  it('clears the error message', () => {
    const store = useTimeSlotStore()

    store.setError('Temporary failure')
    store.clearError()

    expect(store.error).toBeNull()
  })
})
