<script setup lang="ts">
import Login from '@/components/Login.vue';

const login = async (username: string, password: string): Promise<string | null> => {

  if (username !== 'admin' || password !== 'password123') {
    return 'Invalid username or password';
  } else console.log('Attempting login with:', username, password);

  return null;
};
</script>

<template>
  <Login :login="login" />
</template>
