<script setup lang="ts">
defineProps<{ title: string; eyebrow?: string; rightTag?: string; accentColor?: string }>()
</script>

<template>
  <div class="card-premium-strong group p-6 transition hover:-translate-y-0.5 hover:shadow-[0_18px_70px_rgba(15,23,42,0.12)]">
    <div class="flex items-start justify-between gap-4">
      <div>
        <p v-if="eyebrow" class="text-xs font-medium uppercase tracking-wide text-slate-500">{{ eyebrow }}</p>
        <h3 class="mt-1 text-lg font-semibold tracking-tight text-slate-900">{{ title }}</h3>
      </div>

      <span
        v-if="rightTag"
        class="rounded-full px-2.5 py-1 text-xs font-medium shadow-sm"
        :style="{
          backgroundColor: accentColor || 'rgba(var(--brand-yellow), 0.28)',
          color: accentColor ? '#0f172a' : 'rgb(var(--ink))',
        }"
      >
        {{ rightTag }}
      </span>
    </div>

    <div
      v-if="accentColor"
      class="mt-3 h-1 w-10 rounded-full opacity-80 transition group-hover:w-14"
      :style="{ background: accentColor }"
    ></div>

    <div class="mt-3 text-sm leading-relaxed text-slate-600">
      <slot />
    </div>

    <div v-if="$slots.footer" class="mt-5 border-t border-slate-200/70 pt-4">
      <slot name="footer" />
    </div>
  </div>
</template>
