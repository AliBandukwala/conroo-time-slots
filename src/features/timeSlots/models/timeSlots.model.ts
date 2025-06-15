export interface Capacity {
  current_capacity?: number
  max_capacity?: number
  current?: number
  maximum?: number
}

export interface TimeSlot {
  id: number
  start_time?: string
  end_time?: string
  startTime?: string
  endTime?: string
  category: 'green' | 'yellow' | 'red'
  capacity: Capacity
}
