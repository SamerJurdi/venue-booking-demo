<script setup lang="ts">
import {ref, computed} from 'vue';
import {CalendarHeader, CalendarGrid, NewEventPopup} from '@/components';

interface EventItem {
  title: string;
  start: string;
  end: string;
}

const today = new Date();
const selectedDate = ref(new Date(today));
const events = ref<Record<string, EventItem[]>>({});

function getWeekForDate(date: Date): Date[] {
  const start = new Date(date);
  start.setDate(date.getDate() - date.getDay()); // Sunday
  const week: Date[] = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    week.push(d);
  }
  return week;
}
const selectedWeek = ref(getWeekForDate(today));

function changeMonth(delta: number) {
  const newDate = new Date(selectedDate.value);
  newDate.setMonth(newDate.getMonth() + delta);
  selectedDate.value = newDate;
  selectedWeek.value = getWeekForDate(newDate);
}

function updateMonthYear(newMonth: number, newYear: number) {
  const newDate = new Date(selectedDate.value);
  newDate.setMonth(newMonth);
  newDate.setFullYear(newYear);
  selectedDate.value = newDate;
  selectedWeek.value = getWeekForDate(newDate);
}

function selectDay(day: Date) {
  selectedWeek.value = getWeekForDate(day);
}

function addEvent(date: Date, event: EventItem) {
  const key = date.toISOString().split('T')[0];
  if (!events.value[key]) {
    events.value[key] = [];
  }
  events.value[key].push(event);
}

const showNewEventPopup = ref(false);
const newEventDate = ref<Date | null>(null);
function openNewEvent(date: Date) {
  newEventDate.value = date;
  showNewEventPopup.value = true;
}
function closeNewEventPopup() {
  showNewEventPopup.value = false;
}
</script>

<template>
  <div class="p-4">
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
      @addEvent="addEvent"
      @close="closeNewEventPopup"
    />
  </div>
</template>
