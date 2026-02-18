<script setup lang="ts">
const route = useRoute()

const links = [
  { label: 'About', to: '/about' },
  { label: 'Departments', to: '/departments' },
  { label: 'Announcements', to: '/announcements' },
  { label: 'Events', to: '/events' },
  { label: 'Contact', to: '/contact' },
]

const isActive = (to: string) => route.path === to
</script>

<template>
  <div class="min-h-screen bg-white">
    <!-- Top glow -->
    <div class="pointer-events-none fixed inset-x-0 -top-24 h-64 blur-3xl opacity-25"
         style="background: radial-gradient(closest-side, rgb(var(--brand-purple)) 0%, transparent 70%);">
    </div>

    <header class="sticky top-0 z-50 border-b bg-white/80 backdrop-blur">
      <div class="container-x flex h-16 items-center justify-between">
        <NuxtLink to="/" class="flex items-center gap-3">
          <img src="/logo.svg" alt="Westridge Baptist" class="h-8 w-8" />
          <span class="font-semibold tracking-tight text-slate-900">Westridge Baptist</span>
        </NuxtLink>

        <nav class="hidden items-center gap-6 md:flex">
          <NuxtLink
            v-for="l in links"
            :key="l.to"
            :to="l.to"
            class="text-sm transition"
            :class="isActive(l.to)
              ? 'text-slate-900 font-medium'
              : 'text-slate-500 hover:text-slate-900'"
          >
            {{ l.label }}
          </NuxtLink>
        </nav>

        <div class="flex items-center gap-3">
          <UButton
            to="/announcements"
            size="sm"
            class="rounded-xl"
            :style="{ backgroundColor: `rgb(var(--brand-purple))`, color: 'white' }"
          >
            Latest Updates
          </UButton>
        </div>
      </div>
    </header>

    <main class="py-10">
      <NuxtPage />
    </main>

    <footer class="border-t">
      <div class="container-x py-10 text-sm text-slate-500">
        <div class="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <p>© {{ new Date().getFullYear() }} Westridge Baptist Church</p>
          <p class="flex gap-4">
            <NuxtLink class="hover:text-slate-900" to="/contact">Contact</NuxtLink>
            <NuxtLink class="hover:text-slate-900" to="/about">About</NuxtLink>
          </p>
        </div>
      </div>
    </footer>
  </div>
</template>
