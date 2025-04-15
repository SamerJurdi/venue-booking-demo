<script setup lang="ts">
import { useRouter } from 'vue-router'
import { HomeContainer } from '@/containers'

const router = useRouter()

const onSignIn = () => {
  router.push({ name: 'login' })
}
</script>

<template>
  <HomeContainer :onSignIn="onSignIn" />
</template>
