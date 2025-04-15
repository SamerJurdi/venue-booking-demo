<script setup lang="ts">
const props = defineProps<{
  name: string;
  status: string;
}>();
</script>

<template>
  <div class="p-2 border rounded shadow-sm">
    <div class="font-semibold text-sm">{{ name }}</div>
    <div class="text-xs text-gray-600">{{ status }}</div>
  </div>
</template>
