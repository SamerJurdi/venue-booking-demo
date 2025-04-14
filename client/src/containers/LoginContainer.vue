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
  if (username.trim() === '' || password.trim() === '') {
    toast.error('Invalid username or password', { position: POSITION.TOP_CENTER })
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
          toast.error(response.data.message, { position: POSITION.TOP_CENTER })
        }
      })
      .catch(function (error) {
        toast.error(error.response.data.message, { position: POSITION.TOP_CENTER })
      })
  }
}
</script>

<template>
  <LogInForm :login="login" />
</template>
