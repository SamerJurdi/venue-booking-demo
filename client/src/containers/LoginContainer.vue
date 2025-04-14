<script setup lang="ts">
import axios from 'axios'
import { useToast, POSITION } from 'vue-toastification'
import { LogInForm } from '@/components'

const props = defineProps({
  onLogin: {
    type: Function,
    required: true,
  },
})

const toast = useToast()

const login = async (username: string, password: string): Promise<void> => {
  let message
  if (username.trim() === '' || password.trim() === '') {
    message = 'Invalid username or password'
    toast.error(message, { position: POSITION.TOP_CENTER })
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
          toast.error(message, { position: POSITION.TOP_CENTER })
        }
      })
      .catch(function (error) {
        message = error.response.data
        toast.error(message, { position: POSITION.TOP_CENTER })
      })
  }
}
</script>

<template>
  <LogInForm :login="login" />
</template>
