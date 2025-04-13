import { defineStore } from 'pinia'
import axios from 'axios'
import type { EventItem } from '@/common/CustomTypes'
import { formatTime } from '@/common/Functions'

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
      const key = date.toISOString().split('T')[0]
      if (!this.events[key]) {
        this.events[key] = []
      }
      this.events[key].push(event)
    },
    async updateEvents() {
      axios.get('/api/reservations').then(response => {
        console.log({response})
        if (response.status === 200) {
          response.data.reservations.forEach((reservation: any) => {
            this.addEvent(new Date(reservation.start_datetime), {
              title: reservation.type_id,
              start: formatTime(new Date(reservation.start_datetime)),
              end: formatTime(new Date(reservation.end_datetime))
            })
          })
        }
      })
    }
  },
})
