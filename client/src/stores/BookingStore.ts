import { defineStore } from 'pinia'
import type { EventItem } from '@/common/CustomTypes'

const getInitialState = (): {
  selectedDate: Date
  newEventDate: Date
  events: Record<string, EventItem[]>
} => {
  return {
    selectedDate: new Date(),
    newEventDate: new Date(),
    events: {
      '2025-04-13': [
        {
          title: 'Test 1',
          start: '09:30',
          end: '10:00',
        },
        {
          title: 'Test 2',
          start: '11:30',
          end: '12:00',
        },
      ],
      '2025-04-14': [
        {
          title: 'Test 3',
          start: '16:00',
          end: '17:00',
        },
      ],
    },
  }
}

export const useBookingStore = defineStore('booking', {
  state: getInitialState,
  actions: {
    addEvent(date: Date, event: EventItem) {
      const key = date.toISOString().split('T')[0]
      if (!this.events[key]) {
        this.events[key] = []
      }
      this.events[key].push(event)
    },
  },
})
