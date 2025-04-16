import { defineStore } from 'pinia'
import axios from 'axios'
import { useToast } from 'vue-toastification'
import type { EventItem } from '@/common/CustomTypes'
import { formatDate, formatTime } from '@/common/Functions'
import { useUserStore } from './UserStore'

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
  selectedRoom: {key?: string, value?: string}
  selectedDate: Date
  newEventDate: Date
  events: Record<string, EventItem[]>
  reservationTypes: {key: string, value: string}[]
  venues: {key: string, value: string}[]
} => {
  return {
    selectedRoom: {},
    selectedDate: new Date(),
    newEventDate: new Date(),
    events: {},
    reservationTypes: [],
    venues: [],
  }
}

export const useReservationStore = defineStore('reservation', {
  state: getInitialState,
  actions: {
    updateSelectedRoom(room: {key: string, value: string}) {
      this.selectedRoom = room
      this.updateReservations()
    },
    addEvent(date: Date, event: EventItem) {
      const key = formatDate(date)
      if (!this.events[key]) {
        this.events[key] = []
      }
      this.events[key].push(event)
    },
    async updateReservations() {
      this.events = getInitialState().events
      axios.get('/api/reservations/venue/' + this.selectedRoom.key).then((response) => {
        if (response.status === 200) {
          response.data.reservations.forEach((reservation: {is_visible: string, id: string, title: string, description: string, organizer_id: string, organizer: string, type_id: string, type: string, start_datetime: string, end_datetime: string}) => {
            if (reservation.is_visible) {
              this.addEvent(new Date(reservation.start_datetime), {
                ...sampleEventItem,
                reservationId: reservation.id,
                title: reservation.title,
                description: reservation.description || '',
                organizer: {key: reservation.organizer_id, value: reservation.organizer},
                type: {key: reservation.type_id, value: reservation.type},
                start: formatTime(new Date(reservation.start_datetime)),
                end: formatTime(new Date(reservation.end_datetime)),
              })
            }
          })
        } else toast.error(response.data.message || 'Something went wrong!')
      }).catch(error => toast.error(error.response.data.message || 'Something went wrong!'))
    },
    async getReservationTypes() {
      this.reservationTypes = getInitialState().reservationTypes
      axios.get('/api/reservations/types').then((response) => {
        if (response.status === 200) {
          response.data.reservationTypes.forEach((reservationType: {id: string, name: string}) => {
            const key = reservationType.id
            const value = reservationType.name
            this.reservationTypes.push({key, value})
          })
        } else toast.error(response.data.message || 'Something went wrong!')
      }).catch(error => toast.error(error.response.data.message || 'Something went wrong!'))
    },
    async bookReservation(date: Date, event: EventItem) {
      const body = {
        startDate: formatDate(date) + 'T' + event.start + ':00.000Z',
        endDate: formatDate(date) + 'T' + event.end + ':00.000Z',
        typeId: event.type.key,
        venueId: this.selectedRoom.key,
        title: event.title,
        description: event.description,
      }

      axios.post(`/api/reservations/create`, body).then(response => {
        if (response.status === 201) {
          const userStore = useUserStore()
          const organizer = {key: userStore.userId, value: ((userStore.title + ' ') ||  '') + userStore.firstName + ' ' + userStore.lastName}
          this.addEvent(date, {...event, reservationId: response.data.reservationId, organizer})
          toast.success(response.data.message)
        } else {
          toast.error(response.data.message || 'Something went wrong!')
          this.updateReservations()
        }
      }).catch(error => {
        toast.error(error.response.data.message || 'Something went wrong!')
        this.updateReservations()
      })
    },
    async deleteReservation(reservationId: string) {
      axios.delete(`/api/reservations/delete/` + reservationId).then(response => {
        if (response.status === 201) {
          this.updateReservations()
          toast.success(response.data.message)
        } else {
          toast.error(response.data.message || 'Something went wrong!')
          this.updateReservations()
        }
      }).catch(error => {
        toast.error(error.response.data.message || 'Something went wrong!')
        this.updateReservations()
      })
    },
    async getVenues() {
      this.venues = getInitialState().venues
      axios.get('/api/reservations/venues').then((response) => {
        if (response.status === 200) {
          this.venues = response.data.venues
        } else toast.error(response.data.message || 'Something went wrong!')
      }).catch(error => toast.error(error.response.data.message || 'Something went wrong!'))
    },
  },
})
