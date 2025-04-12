<script setup lang="ts">
import axios from 'axios'
import { LogInForm } from '@/components'

const props = defineProps({
  onLogin: {
    type: Function,
    required: true,
  },
})

const login = async (username: string, password: string): Promise<string | null> => {
  let message = null
  if (username.trim() === '' || password.trim() === '') {
    return 'Invalid username or password'
  } else {
    await axios
      .post(`/api/auth/login`, {
        username,
        password,
      })
      .then(function (response) {
        if (response.status === 200) {
          props.onLogin()
        } else {
          message = 'Log in failed. Status: ' + response.status
        }
      })
      .catch(function (error) {
        message = error.response.data
      })
    return message
  }
}
</script>

<template>
  <LogInForm :login="login" />
</template>
