<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import axios from 'axios'
import { POSITION, useToast } from 'vue-toastification'
import { useBookingStore } from '@/stores/BookingStore'
import { CalendarHeader, CalendarGrid, NewEventPopup } from '@/components'

const props = defineProps({
  onSignIn: {
    type: Function,
    required: true,
  },
})

const { selectedDate, newEventDate, events, reservationTypes } = storeToRefs(useBookingStore())

const userId = ref(null)
const toast = useToast()

function getWeekForDate(date: Date): Date[] {
  const start = new Date(date)
  start.setDate(date.getDate() - date.getDay()) // Sunday
  const week: Date[] = []
  for (let i = 0; i < 7; i++) {
    const d = new Date(start)
    d.setDate(start.getDate() + i)
    week.push(d)
  }
  return week
}
const selectedWeek = ref(getWeekForDate(selectedDate.value))

function changeMonth(delta: number) {
  const newDate = new Date(selectedDate.value)
  newDate.setMonth(newDate.getMonth() + delta)
  selectedDate.value = newDate
  selectedWeek.value = getWeekForDate(newDate)
}

function updateMonthYear(newMonth: number, newYear: number) {
  const newDate = new Date()
  newDate.setDate(1)
  newDate.setMonth(newMonth)
  newDate.setFullYear(newYear)
  selectedDate.value = newDate
  selectedWeek.value = getWeekForDate(newDate)
}

function selectDay(day: Date) {
  selectedDate.value = day
  selectedWeek.value = getWeekForDate(day)
}

const showNewEventPopup = ref(false)
function openNewEvent(date: Date) {
  newEventDate.value = date
  showNewEventPopup.value = true
}
function closeNewEventPopup() {
  showNewEventPopup.value = false
}

async function setActiveUser() {
  await axios
    .get('/api/auth/user')
    .then(function (response) {
      if (response.status !== 200) {
        toast('Please log in to continue', {position: POSITION.TOP_CENTER, timeout: 2000})
        props.onSignIn()
      } else {
        userId.value = response.data.userId}
    })
    .catch(function () {
      toast('Please log in to continue', {position: POSITION.TOP_CENTER, timeout: 2000})
      props.onSignIn()
    })
}

onMounted(async () => {
  await setActiveUser()
  if (userId.value) {
    await useBookingStore().getReservationTypes()
    useBookingStore().updateEvents()
  }
})
</script>

<template>
  <div class="h-screen p-4">
    <CalendarHeader
      :selectedDate="selectedDate"
      @changeMonth="changeMonth"
      @updateMonthYear="updateMonthYear"
    />

    <CalendarGrid
      :selectedDate="selectedDate"
      :selectedWeek="selectedWeek"
      :events="events"
      @selectDay="selectDay"
      @openNewEvent="openNewEvent"
    />

    <NewEventPopup
      v-if="showNewEventPopup"
      :date="newEventDate"
      :types="reservationTypes"
      @addEvent="useBookingStore().addEvent"
      @close="closeNewEventPopup"
    />
  </div>
</template>
