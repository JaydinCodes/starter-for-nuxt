<script setup lang="ts">
defineProps<{ title: string; description?: string; actionLabel?: string; actionTo?: string }>()
</script>

<template>
  <div class="card-premium p-10 text-center">
    <div
      class="mx-auto mb-4 grid h-12 w-12 place-items-center rounded-2xl"
      :style="{ backgroundColor: 'rgba(var(--brand-purple),0.10)' }"
    >
      <span class="text-lg" :style="{ color: `rgb(var(--brand-purple))` }">✦</span>
    </div>

    <h3 class="text-lg font-semibold text-slate-900">{{ title }}</h3>
    <p v-if="description" class="mx-auto mt-2 max-w-md text-sm text-slate-500">
      {{ description }}
    </p>

    <div v-if="actionLabel && actionTo" class="mt-6">
      <NuxtLink :to="actionTo" class="btn-brand inline-flex items-center justify-center">
        {{ actionLabel }}
      </NuxtLink>
    </div>
  </div>
</template>
