<script setup lang="ts">
import { computed } from 'vue';

interface EventItem {
  title: string;
  start: string;
  end: string;
}

const props = defineProps<{ 
  selectedDate: Date; 
  selectedWeek: Date[]; 
  events: Record<string, EventItem[]>; 
}>();
defineEmits<{
  (e: 'selectDay', day: Date): void;
  (e: 'openNewEvent', day: Date): void;
}>();

const selectedWeekSet = computed(() => {
  return new Set(props.selectedWeek.map(d => d.toISOString().split('T')[0]));
});

// Start from the nearest Sunday before the first day of the month and end on the Saturday after the last day of the month.
const monthGrid = computed(() => {
  const year = props.selectedDate.getFullYear();
  const month = props.selectedDate.getMonth();
  const firstOfMonth = new Date(year, month, 1);
  const start = new Date(firstOfMonth);
  start.setDate(firstOfMonth.getDate() - firstOfMonth.getDay());
  
  const lastOfMonth = new Date(year, month + 1, 0);
  const end = new Date(lastOfMonth);
  end.setDate(lastOfMonth.getDate() + (6 - lastOfMonth.getDay()));
  
  const days: Date[] = [];
  const curr = new Date(start);
  while (curr <= end) {
    days.push(new Date(curr));
    curr.setDate(curr.getDate() + 1);
  }
  return days;
});
</script>

<template>
  <div>
    <div class="grid grid-cols-7 gap-1">
      <div 
        v-for="day in monthGrid" 
        :key="day.toISOString()"
        @click="$emit('selectDay', day)"
        class="border relative cursor-pointer hover:bg-gray-100 p-2"
      >
        <template v-if="!selectedWeekSet.has(day.toISOString().split('T')[0])">
          <div class="text-sm absolute top-1 left-1">
            {{ day.getDate() }}
          </div>
          <div class="mt-4 space-y-1">
            <template :key="event.start + event.end" v-for="(event, index) in props.events[day.toISOString().split('T')[0]] || []">
              <div v-if="index < 4" class="bg-blue-200 text-xs text-blue-800 rounded px-1 truncate">
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
          <div class="mt-8 h-24 overflow-y-auto space-y-1">
            <template :key="event.start + event.end" v-for="event in props.events[day.toISOString().split('T')[0]] || []">
              <div class="bg-blue-100 text-xs text-blue-700 rounded px-1 py-0.5">
                <div>{{ event.title }}</div>
                <div>{{ event.start }} - {{ event.end }}</div>
              </div>
            </template>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>
