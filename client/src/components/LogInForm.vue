<script setup lang="ts">
import { ref } from 'vue'

const emit = defineEmits<{
  (e: 'login', username: string, password: string): void
}>()

const username = ref('')
const password = ref('')

const submit = () => {
  emit('login', username.value, password.value)
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="w-full max-w-xs p-8 bg-white rounded shadow">
      <form @submit.prevent="submit">
        <div class="mb-4">
          <input
            type="text"
            placeholder="Username"
            v-model="username"
            class="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <div class="mb-6">
          <input
            type="password"
            placeholder="Password"
            v-model="password"
            class="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <button
          type="submit"
          class="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none"
        >
          Log In
        </button>
      </form>
    </div>
  </div>
</template>
