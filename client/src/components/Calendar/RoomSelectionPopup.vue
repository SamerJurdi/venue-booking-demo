<script setup lang="ts">
import { ref, defineEmits } from 'vue'

const props = defineProps<{
  userName: string
  rooms: {key: string, value: string}[]
  selectedRoom: {key: string, value: string}
}>()

const emit = defineEmits<{
  (e: 'updateSelectedRoom', selectedRoom: {key: string, value: string}): void;
  (e: 'logout'):  void;
}>();

const isRoomSelected = ref(false)

function onRoomChange(event: Event) {
  const target = event.target as HTMLSelectElement;
  const selectedRoom = JSON.parse(target.value)
  isRoomSelected.value = true

  emit('updateSelectedRoom', {key: selectedRoom.key, value: selectedRoom.value})
}

</script>

<template>
  <transition 
  mode="out-in"
    enter-active-class="transition duration-500 ease-out"
    enter-from-class="transform scale-95"
    enter-to-class="transform scale-100"
  leave-active-class="transition duration-300 ease-in"
    leave-from-class="transform scale-100"
    leave-to-class="transform scale-95"
  >
    <div v-if="!isRoomSelected" class="bg-black/10 fixed inset-0 flex items-center justify-center z-50">
      <div class="bg-white p-6 rounded-2xl w-3/5">
        <div class="flex justify-between items-center mb-4">
          <span class="text-xl font-bold">Welcome {{ props.userName }}</span>
          <button @click="$emit('logout')" class="bg-red-500 text-white rounded-full p-2">
            Logout
          </button>
        </div>
        <div class="flex flex-col">
          <label for="roomSelect" class="mb-2 font-medium">Select a Room:</label>
          <select @change="onRoomChange" class="border rounded px-2 py-1">
            <option value="" disabled selected>-- Select Room --</option>
            <option v-for="room in props.rooms" :key="room.key" :value="JSON.stringify(room)">
              {{ room.value }}
            </option>
          </select>
        </div>
      </div>
    </div>

    <div v-else class="relative w-full bg-white shadow p-4 flex justify-between items-center z-50">
      <div class="flex items-center">
        <span class="text-xl font-bold">Welcome {{ props.userName }}</span>
        <span class="ml-4 text-gray-600">
          Room:
          <select @change="onRoomChange" class="border rounded px-2 py-1 ml-2">
            <option v-for="room in props.rooms" :key="room.key" :value="JSON.stringify(room)">
              {{ room.value }}
            </option>
          </select>
        </span>
      </div>
      <button @click="$emit('logout')" class="bg-red-500 text-white rounded-full p-2">
        Logout
      </button>
    </div>
  </transition>
</template>
