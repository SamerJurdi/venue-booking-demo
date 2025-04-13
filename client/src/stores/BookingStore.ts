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
    events: {},
  }
}

export const useBookingStore = defineStore('booking', {
  state: getInitialState,
  actions: {
    addEvent(date: Date, event: EventItem) {
      console.log({ date })
      const key = date.toISOString().split('T')[0]
      if (!this.events[key]) {
        this.events[key] = []
      }
      this.events[key].push(event)
    },
  },
})
