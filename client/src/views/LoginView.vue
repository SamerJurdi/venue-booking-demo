<script setup lang="ts">
import { useRouter } from 'vue-router'
import { LoginContainer } from '@/containers'

const router = useRouter()

const onLogin = () => {
  router.push({ name: 'home' })
}
</script>

<template>
  <LoginContainer :onLogin="onLogin" />
</template>
