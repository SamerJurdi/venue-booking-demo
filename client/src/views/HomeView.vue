<script setup lang="ts">
import { useRouter } from 'vue-router'
import { CalendarContainer } from '@/containers'

const router = useRouter()

const onSignIn = () => {
  router.push({ name: 'login' })
}
</script>

<template>
  <CalendarContainer :onSignIn="onSignIn" />
</template>
