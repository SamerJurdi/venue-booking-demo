import { defineStore } from 'pinia'
import axios from 'axios'
import { useToast } from 'vue-toastification'
import type { EventItem } from '@/common/CustomTypes'
import { formatDate, formatTime } from '@/common/Functions'

const toast = useToast()

const sampleEventItem = {
  participantsMandatory: [
    { name: 'Alice Johnson', status: 'Confirmed' },
    { name: 'Bob Williams', status: 'Pending' },
  ],
  participantsOptional: [
    { name: 'Charlie Brown', status: 'Invited' },
    { name: 'Diana Prince', status: 'Invited' },
  ]
}

const getInitialState = (): {
  selectedDate: Date
  newEventDate: Date
  events: Record<string, EventItem[]>
  reservationTypes: {key: string, value: string}[]
} => {
  return {
    selectedDate: new Date(),
    newEventDate: new Date(),
    events: {},
    reservationTypes: [],
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
            reservation.is_visible && this.addEvent(new Date(reservation.start_datetime), {
              ...sampleEventItem,
              title: reservation.title,
              description: reservation.description || '',
              organizer: reservation.organizer,
              type: {key: reservation.type_id, value: reservation.type},
              start: formatTime(new Date(reservation.start_datetime)),
              end: formatTime(new Date(reservation.end_datetime)),
            })
          })
        } else toast.error(response.data.message || 'Something went wrong!')
      }).catch(error => toast.error(error.response.data.message || 'Something went wrong!'))
    },
    async getReservationTypes() {
      this.reservationTypes = getInitialState().reservationTypes
      axios.get('/api/reservations/types').then((response) => {
        if (response.status === 200) {
          response.data.reservationTypes.forEach((reservationType: any) => {
            const key = reservationType.id
            const value = reservationType.name
            this.reservationTypes.push({key, value})
          })
        } else toast.error(response.data.message || 'Something went wrong!')
      }).catch(error => toast.error(error.response.data.message || 'Something went wrong!'))
    },
  },
})
