<script setup lang="ts">
import { ref } from 'vue'
import type { EventItem } from '@/common/CustomTypes'

const sampleEventItem = {
  organizer: 'Professor Smith',
  participantsMandatory: [
    { name: 'Alice Johnson', status: 'Confirmed' },
    { name: 'Bob Williams', status: 'Pending' },
  ],
  participantsOptional: [
    { name: 'Charlie Brown', status: 'Invited' },
    { name: 'Diana Prince', status: 'Invited' },
  ]
}

const props = defineProps<{
  date: Date
  types: {key: string, value: string}[]
}>()
const emit = defineEmits<{
  (e: 'addEvent', date: Date, event: EventItem): void
  (e: 'close'): void
}>()

const title = ref('')
const type = ref<{key?: string, value?: string}>({})
const description = ref('')
const startTime = ref('')
const endTime = ref('')

const submitEvent = () => {
  if (!props.date || !title.value || !startTime.value || !endTime.value || !type.value) return
  emit('addEvent', props.date, {
    ...sampleEventItem,
    title: title.value,
    type: type.value,
    description: description.value,
    start: startTime.value,
    end: endTime.value,
  })

  title.value = ''
  type.value = {}
  description.value = ''
  startTime.value = ''
  endTime.value = ''
  emit('close')
}
</script>

<template>
  <div class="fixed inset-0 bg-black/50 flex items-center justify-center">
    <div class="bg-white p-6 rounded shadow-lg w-80">
      <h2 class="text-lg font-bold mb-4">New Event on {{ props.date.toDateString() }}</h2>
      <div class="mb-2">
        <label for="eventType" class="block mb-1 font-medium">Type</label>
        <select id="eventType" v-model="type" class="w-full px-2 py-1 border rounded">
          <option value="" disabled>Select booking type</option>
          <option v-for="type in props.types" :key="type.key" :value="type">
            {{ type.value }}
          </option>
        </select>
      </div>

      <div class="mb-2">
        <label for="title" class="block mb-1 font-medium">Title</label>
        <input
          id="title"
          type="text"
          v-model="title"
          placeholder="Enter event title"
          class="w-full px-2 py-1 border rounded"
        />
      </div>

      <div class="mb-2">
        <label for="eventDescription" class="block mb-1 font-medium">Description</label>
        <textarea
          id="eventDescription"
          v-model="description"
          placeholder="Enter event description (optional)"
          class="w-full px-2 py-1 border rounded"
          rows="3"
        ></textarea>
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
