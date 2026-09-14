<script setup lang="ts">
defineProps<{ title: string; subtitle?: string; to?: string; linkLabel?: string }>()
</script>

<template>
  <div class="flex items-end justify-between gap-4">
    <div>
      <h2 class="section-title">{{ title }}</h2>
      <p v-if="subtitle" class="section-subtitle">{{ subtitle }}</p>
    </div>
    <NuxtLink v-if="to && linkLabel" :to="to" class="link-brand text-sm">
      {{ linkLabel }} →
    </NuxtLink>
  </div>
</template>
