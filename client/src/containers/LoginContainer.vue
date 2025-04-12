<script setup lang="ts">
import { LogInForm } from '@/components'

const props = defineProps({
  onLogin: {
    type: Function,
    required: true,
  },
})

const login = async (username: string, password: string): Promise<string | null> => {
  if (username !== 'admin' || password !== 'password123') {
    return 'Invalid username or password'
  } else {
    console.log('Attempting login with:', username, password)
    props.onLogin()
    return null
  }
}
</script>

<template>
  <LogInForm :login="login" />
</template>
