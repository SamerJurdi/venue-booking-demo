<script setup lang="ts">
import { computed, ref } from 'vue'
import type { EventItem } from '@/common/CustomTypes'
import { formatDate, getTypeBgColor100, getTypeBgColor200, getTypeTextColor700, getTypeTextColor800 } from '@/common/Functions'
import { EventDetailPopup } from '@/components';

const props = defineProps<{
  selectedDate: Date
  selectedWeek: Date[]
  events: Record<string, EventItem[]>
  checkOwner: Function
}>()
defineEmits<{
  (e: 'selectDay', day: Date): void
  (e: 'openNewEvent', day: Date): void
  (e: 'deleteEvent', event: EventItem): void
}>()

const selectedWeekSet = computed(() => {
  return new Set(props.selectedWeek.map((d) => formatDate(d)))
})

const monthGrid = computed(() => {
  const year = props.selectedDate.getFullYear()
  const month = props.selectedDate.getMonth()
  const firstOfMonth = new Date(year, month, 1)
  const start = new Date(firstOfMonth)
  start.setDate(firstOfMonth.getDate() - firstOfMonth.getDay())

  const lastOfMonth = new Date(year, month + 1, 0)
  const end = new Date(lastOfMonth)
  end.setDate(lastOfMonth.getDate() + (6 - lastOfMonth.getDay()))

  const days: Date[] = []
  const curr = new Date(start)
  while (curr <= end) {
    days.push(new Date(curr))
    curr.setDate(curr.getDate() + 1)
  }
  return days
})

const showEventPopup = ref(false)
const selectedEventDetail = ref<EventItem>()

function openEventDetail(event: EventItem) {
  selectedEventDetail.value = {...event}
  showEventPopup.value = true
}
</script>

<template>
    <div class="grid grid-cols-7 gap-1 h-7/9">
      <div
        v-for="day in monthGrid"
        :key="formatDate(day)"
        @click="$emit('selectDay', day)"
        class="border relative cursor-pointer hover:bg-gray-100 p-2"
      >
        <template v-if="!selectedWeekSet.has(formatDate(day))">
          <div class="text-sm absolute top-1 left-1">
            {{ day.getDate() }}
          </div>
          <div class="mt-4 h-20 space-y-1">
            <template
            :key="event.start + event.end"
            v-for="(event, index) in props.events[formatDate(day)] || []"
            >
              <div v-if="index < 4" :class="[getTypeBgColor200(event.type.value), 'text-xs', getTypeTextColor800(event.type.value), 'rounded px-1 truncate']">
                {{ event.title }}
              </div>
            </template>
          </div>
        </template>

        <template v-else>
          <div class="relative">
            <span class="text-lg font-bold absolute top-1 left-1">{{ day.getDate() }}</span>
            <button
              class="absolute top-1 right-1 text-xl text-green-500 hover:text-green-600"
              @click.stop="$emit('openNewEvent', day)"
            >
              +
            </button>
          </div>
          <div class="mt-8 h-50 overflow-y-auto space-y-1">
            <template
            :key="event.start + event.end"
            v-for="event in props.events[formatDate(day)] || []"
            >
              <div :class="[getTypeBgColor100(event.type.value), 'text-xs', getTypeTextColor700(event.type.value), 'rounded px-1 py-0.5 cursor-pointer']"
                   @click.stop="openEventDetail(event)">
                <div>{{ event.title }}</div>
                <div>{{ event.start }} - {{ event.end }}</div>
              </div>
            </template>
          </div>
        </template>
      </div>
    </div>

    <EventDetailPopup
      v-if="showEventPopup && selectedEventDetail"
      :event="selectedEventDetail"
      :showDeleteButton="checkOwner(selectedEventDetail.organizer.key)"
      @close="showEventPopup = false"
      @deleteEvent="(event: EventItem) => {
        $emit('deleteEvent', event)
        showEventPopup = false
      }"
    />
</template>
