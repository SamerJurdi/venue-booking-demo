<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/stores/UserStore'
import { useBookingStore } from '@/stores/BookingStore'
import { CalendarHeader, CalendarGrid, NewEventPopup, RoomSelectionPopup } from '@/components'
import type { EventItem } from '@/common/CustomTypes'

const { selectedRoom, selectedDate, newEventDate, events, reservationTypes, venues } = storeToRefs(useBookingStore())
const { userId, title, firstName } = storeToRefs(useUserStore())

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

function buildUserName() {
  return (title.value && (title.value + ' ' + firstName.value)) || firstName.value || ''
}

onMounted(async () => {
  await useUserStore().setActiveUser()
  if (userId.value) {
    await useBookingStore().getReservationTypes()
    await useBookingStore().getVenues()
  }
})
</script>

<template>
  <div class="p-4">
    <RoomSelectionPopup :userName="buildUserName()" :rooms="venues" :selectedRoom="{}" @updateSelectedRoom="useBookingStore().updateSelectedRoom" @logout="useUserStore().logout" />

    <transition
      enter-active-class="transition-opacity duration-3000" 
      enter-from-class="opacity-0" 
      enter-to-class="opacity-100"
    >
      <div v-if="selectedRoom.key" class="shadow-2xl px-4 pb-4 mt-2 border-t">
        <CalendarHeader
          :selectedDate="selectedDate"
          @changeMonth="changeMonth"
          @updateMonthYear="updateMonthYear"
        />

        <CalendarGrid
          :selectedDate="selectedDate"
          :selectedWeek="selectedWeek"
          :events="events"
          :checkOwner="(ownerId: string): boolean => ownerId === userId"
          @selectDay="selectDay"
          @openNewEvent="openNewEvent"
          @deleteEvent="(event: EventItem) => event.reservationId && useBookingStore().deleteReservation(event.reservationId)"
        />
      </div>
    </transition>

    <NewEventPopup
      v-if="showNewEventPopup"
      :date="newEventDate"
      :types="reservationTypes"
      :organizer="{key: userId}"
      @addEvent="useBookingStore().bookReservation"
      @close="closeNewEventPopup"
    />
  </div>
</template>
