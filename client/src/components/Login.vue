<script setup lang="ts">
import { ref, defineProps, watch } from 'vue';

interface LoginFunction {
  (username: string, password: string): Promise<string | null> | string | null;
}

const props = defineProps<{
  login: LoginFunction;
}>();

const username = ref('');
const password = ref('');
const errorMessage = ref('');

const submit = async () => {
  const result = await props.login(username.value, password.value);
  if (result) {
    errorMessage.value = result;
  }
};

const clearError = () => {
  errorMessage.value = '';
};

watch([username, password], () => {
  clearError();
});
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
            @input="clearError"
            class="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <div class="mb-6">
          <input
            type="password"
            placeholder="Password"
            v-model="password"
            @input="clearError"
            class="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <div v-if="errorMessage" class="mb-4 text-red-500 text-sm">
          {{ errorMessage }}
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
