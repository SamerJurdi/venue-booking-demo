import { defineStore } from 'pinia'
import axios from 'axios'
import { useToast } from 'vue-toastification'
import type { EventItem } from '@/common/CustomTypes'
import { formatDate, formatTime } from '@/common/Functions'

const toast = useToast()

const getInitialState = (): {
  selectedDate: Date
  newEventDate: Date
  events: Record<string, EventItem[]>
  reservationTypes: Record<string, string>
} => {
  return {
    selectedDate: new Date(),
    newEventDate: new Date(),
    events: {},
    reservationTypes: {},
  }
}

export const useBookingStore = defineStore('booking', {
  state: getInitialState,
  actions: {
    addEvent(date: Date, event: EventItem) {
      const key = formatDate(date)
      if (!this.events[key]) {
        this.events[key] = []
      }
      this.events[key].push(event)
    },
    async updateEvents() {
      this.events = getInitialState().events
      axios.get('/api/reservations').then((response) => {
        if (response.status === 200) {
          response.data.reservations.forEach((reservation: any) => {
            this.addEvent(new Date(reservation.start_datetime), {
              title: this.reservationTypes[reservation.type_id],
              start: formatTime(new Date(reservation.start_datetime)),
              end: formatTime(new Date(reservation.end_datetime)),
            })
          })
        } else toast.error(response.data.message || 'Something went wrong!')
      }).catch(error => toast.error(error.response.data.message || 'Something went wrong!'))
    },
    async getReservationTypes() {
      axios.get('/api/reservations/types').then((response) => {
        if (response.status === 200) {
          response.data.reservationTypes.forEach((reservationType: any) => {
            const key = reservationType.id
            const value = reservationType.name
            this.reservationTypes[key] = value
          })
        } else toast.error(response.data.message || 'Something went wrong!')
      }).catch(error => toast.error(error.response.data.message || 'Something went wrong!'))
    },
  },
})
