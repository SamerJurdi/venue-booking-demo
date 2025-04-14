<script setup lang="ts">
import { ref } from 'vue'
import type { EventItem } from '@/common/CustomTypes'

const props = defineProps<{
  date: Date
  types: Record<string, string>
}>()
const emit = defineEmits<{
  (e: 'addEvent', date: Date, event: EventItem): void
  (e: 'close'): void
}>()

const title = ref('')
const startTime = ref('')
const endTime = ref('')

const submitEvent = () => {
  if (!props.date || !title.value || !startTime.value || !endTime.value) return
  emit('addEvent', props.date, {
    title: title.value,
    start: startTime.value,
    end: endTime.value,
  })

  title.value = ''
  startTime.value = ''
  endTime.value = ''
  emit('close')
}
</script>

<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
    <div class="bg-white p-6 rounded shadow-lg w-80">
      <h2 class="text-lg font-bold mb-4">New Event on {{ props.date.toDateString() }}</h2>
      <div class="mb-2">
        <label for="eventType" class="block mb-1 font-medium">Type</label>
        <select id="eventType" v-model="title" class="w-full px-2 py-1 border rounded">
          <option value="" disabled>Select booking type</option>
          <option v-for="(display, key) in props.types" :key="key" :value="key">
            {{ display }}
          </option>
        </select>
      </div>
      <div class="mb-2">
        <input type="time" v-model="startTime" class="w-full px-2 py-1 border rounded" />
      </div>
      <div class="mb-2">
        <input type="time" v-model="endTime" class="w-full px-2 py-1 border rounded" />
      </div>
      <div class="flex justify-end space-x-2">
        <button @click="$emit('close')" class="px-3 py-1 border rounded">Cancel</button>
        <button @click="submitEvent" class="px-3 py-1 bg-blue-600 text-white rounded">
          Submit
        </button>
      </div>
    </div>
  </div>
</template>
