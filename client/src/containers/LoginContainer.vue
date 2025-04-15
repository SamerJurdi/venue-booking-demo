<script setup lang="ts">
import { useUserStore } from '@/stores/UserStore'
import { LogInForm } from '@/components'
</script>

<template>
  <LogInForm @login="useUserStore().login" />
</template>
