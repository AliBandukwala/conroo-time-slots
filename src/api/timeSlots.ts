const BASE_URL = 'https://timeslot-stream-ha2tva3niq-ey.a.run.app'

export async function fetchTimeSlots() {
  const response = await fetch(`${BASE_URL}/timeSlots`)
  return response.json()
}

export function subscribeToUpdates(onMessage: (update: any) => void) {
  const eventSource = new EventSource(`${BASE_URL}/sse`)
  eventSource.onmessage = (event) => {
    const data = JSON.parse(event.data)
    onMessage(data)
  }
  return eventSource
}
