import { describe, it, expect, vi, beforeEach } from 'vitest'
import { fetchTimeSlots, subscribeToUpdates } from '@/api/timeSlots'

global.fetch = vi.fn() as unknown as typeof fetch

describe('api/timeSlots', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('fetchTimeSlots makes a GET request and returns data', async () => {
    const mockResponse = [
      {
        id: 1,
        start_time: '2024-07-23T08:00:00',
        end_time: '2024-07-23T08:30:00',
        category: 'yellow',
        capacity: { current_capacity: 20, max_capacity: 50 }
      }
    ];

    // mock fetch response
    (fetch as any).mockResolvedValue({
      json: () => Promise.resolve(mockResponse)
    })

    const result = await fetchTimeSlots()

    expect(fetch).toHaveBeenCalledOnce()
    expect(fetch).toHaveBeenCalledWith('https://timeslot-stream-ha2tva3niq-ey.a.run.app/timeSlots')
    expect(result).toEqual(mockResponse)
  })

  it('subscribeToUpdates calls onMessage with parsed data', () => {
    const onMessage = vi.fn()
    const mockData = { id: 1, currentCapacity: 30, category: 'green' }

    // Mock EventSource
    const mockEventSource = {
      onmessage: null as unknown as (event: MessageEvent) => void,
      close: vi.fn()
    }

    vi.stubGlobal('EventSource', vi.fn(() => mockEventSource))

    const eventSource = subscribeToUpdates(onMessage)

    // Simulate SSE message event
    const messageEvent = { data: JSON.stringify(mockData) } as MessageEvent
    // Manually trigger the callback that would be assigned by subscribeToUpdates
    if (mockEventSource.onmessage) {
      mockEventSource.onmessage(messageEvent)
    }

    expect(onMessage).toHaveBeenCalledWith(mockData)
    expect(eventSource).toBe(mockEventSource)
  })
})