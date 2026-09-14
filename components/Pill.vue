<script setup lang="ts">
defineProps<{ label: string }>()
</script>

<template>
  <span
    class="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium"
    :style="{ backgroundColor: 'rgba(var(--brand-yellow), 0.22)', color: 'rgb(var(--ink))' }"
  >
    <span class="h-2 w-2 rounded-full" :style="{ backgroundColor: `rgb(var(--brand-purple))` }"></span>
    {{ label }}
  </span>
</template>