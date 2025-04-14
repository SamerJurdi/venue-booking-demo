<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';
import type { EventItem } from '@/common/CustomTypes'
import { ParticipantCard } from '@/components';

const props = defineProps<{
  event: EventItem;
}>();

const emit = defineEmits<{
  (e: 'close'): void;
}>();

function getTypeColor(type: string): string {
  const colors: Record<string, string> = {
    meeting: 'bg-blue-200',
    appointment: 'bg-green-200',
    reminder: 'bg-yellow-200',
    call: 'bg-purple-200',
  };
  return colors[type] || 'bg-gray-200';
}
</script>

<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white rounded shadow-lg w-3/5 h-4/5 flex flex-col">
      <div class="flex justify-between items-center p-4 border-b">
        <h2 class="text-xl font-bold">Event Details</h2>
        <button @click="$emit('close')" class="text-red-500 text-2xl">&times;</button>
      </div>

      <div class="flex flex-1 overflow-hidden">
        <div class="w-1/2 p-4 border-r overflow-y-auto">
          <div class="mb-4">
            <h3 class="text-2xl font-bold">{{ props.event.title }}</h3>
            <div class="flex items-center space-x-2">
              <span class="text-sm font-medium">Type:</span>
              <span :class="['px-2 py-1 rounded', getTypeColor(props.event.type), 'text-xs']">
                {{ props.event.type }}
              </span>
            </div>
          </div>
          <div class="mb-4">
            <span class="block text-sm font-medium">Organized by:</span>
            <span class="text-sm">{{ props.event.organizedBy }}</span>
          </div>
          <div class="mb-4">
            <span class="block text-sm font-medium">Time:</span>
            <span class="text-sm">{{ props.event.start }} - {{ props.event.end }}</span>
          </div>
          <div>
            <span class="block text-sm font-medium mb-1">Description:</span>
            <textarea readonly class="w-full h-32 p-2 border rounded resize-none" :value="props.event.description"></textarea>
          </div>
        </div>

        <div class="w-1/2 p-4 overflow-y-auto">
          <h3 class="text-xl font-bold mb-2">Participants</h3>
          <div class="mb-4" v-if="props.event.participantsMandatory.length > 0">
            <h4 class="text-lg font-medium border-b pb-1">Mandatory</h4>
            <div class="space-y-2 mt-2 overflow-y-auto">
              <ParticipantCard
                v-for="(participant, index) in props.event.participantsMandatory"
                :key="index"
                :name="participant.name"
                :status="participant.status"
              />
            </div>
          </div>
          <div v-if="props.event.participantsOptional.length > 0">
            <h4 class="text-lg font-medium border-b pb-1">Optional</h4>
            <div class="space-y-2 mt-2 overflow-y-auto">
              <ParticipantCard
                v-for="(participant, index) in props.event.participantsOptional"
                :key="index"
                :name="participant.name"
                :status="participant.status"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
