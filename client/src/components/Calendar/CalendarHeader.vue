<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'

const props = defineProps<{ selectedDate: Date }>()
const emit = defineEmits<{
  (e: 'changeMonth', delta: number): void
  (e: 'updateMonthYear', newMonth: number, newYear: number): void
}>()

const months = [
  { value: 0, name: 'January' },
  { value: 1, name: 'February' },
  { value: 2, name: 'March' },
  { value: 3, name: 'April' },
  { value: 4, name: 'May' },
  { value: 5, name: 'June' },
  { value: 6, name: 'July' },
  { value: 7, name: 'August' },
  { value: 8, name: 'September' },
  { value: 9, name: 'October' },
  { value: 10, name: 'November' },
  { value: 11, name: 'December' },
]
const week = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

const monthInput = ref<number>(0)
const yearInput = ref<number>(0)
const yearOptions = ref<number[]>([])

onMounted(() => {
  updateInputs(props.selectedDate)
})

watch(
  () => props.selectedDate,
  (newDate) => {
    updateInputs(newDate)
  },
)

function updateInputs(date: Date) {
  monthInput.value = date.getMonth()
  yearInput.value = date.getFullYear()
  const currentYear = date.getFullYear()
  yearOptions.value = [currentYear - 1, currentYear, currentYear + 1]
}

function onMonthYearChange() {
  emit('updateMonthYear', monthInput.value, yearInput.value)
}
</script>

<template>
  <div class="flex items-center justify-between mb-4">
    <button @click="$emit('changeMonth', -1)" class="px-4 py-2 bg-gray-200 rounded">&larr;</button>

    <div class="flex flex-row items-center space-x-4">
      <select
        v-model.number="monthInput"
        @change="onMonthYearChange"
        class="text-lg font-bold text-center w-32 border-b focus:outline-none"
      >
        <option v-for="month in months" :key="month.value" :value="month.value">
          {{ month.name }}
        </option>
      </select>

      <select
        v-model.number="yearInput"
        @change="onMonthYearChange"
        class="text-lg font-bold text-center w-24 border-b focus:outline-none"
      >
        <option v-for="year in yearOptions" :key="year" :value="year">
          {{ year }}
        </option>
      </select>
    </div>

    <button @click="$emit('changeMonth', 1)" class="px-4 py-2 bg-gray-200 rounded">&rarr;</button>
  </div>
  <div class="grid grid-cols-7 mb-2">
    <div class="text-center font-semibold" v-for="day in week" :key="day">
      {{ day }}
    </div>
  </div>
</template>
