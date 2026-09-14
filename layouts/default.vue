<script setup lang="ts">
import { ref } from 'vue'

const route = useRoute()

const links = [
  { label: 'About', to: '/about' },
  { label: 'Departments', to: '/departments' },
  { label: 'Announcements', to: '/announcements' },
  { label: 'Events', to: '/events' },
  { label: 'Contact', to: '/contact' },
]

const isActive = (to: string) => route.path === to

const isMobileNavOpen = ref(false)

const toggleMobileNav = () => {
  isMobileNavOpen.value = !isMobileNavOpen.value
}

watch(
  () => route.path,
  () => {
    // close menu on navigation so it never stays open
    isMobileNavOpen.value = false
  }
)
</script>

<template>
  <div class="min-h-screen bg-hero">
    <!-- ambient glow -->
    <div class="pointer-events-none fixed inset-x-0 -top-24 h-72 blur-3xl opacity-30"
         style="background: radial-gradient(closest-side, rgb(var(--brand-purple)) 0%, transparent 70%);">
    </div>

    <header class="sticky top-0 z-50 border-b border-slate-200/60 glass-top">
      <div class="container-x flex h-16 items-center justify-between">
        <NuxtLink to="/" class="flex items-center gap-3">
          <img src="/logo.svg" alt="Westridge Baptist" class="h-9 w-9" />
          <div class="leading-tight">
            <div class="font-semibold tracking-tight text-slate-900">Westridge</div>
            <div class="text-xs text-slate-500 -mt-0.5">Baptist Church</div>
          </div>
        </NuxtLink>

        <!-- Desktop nav -->
        <nav class="hidden items-center gap-6 md:flex">
          <NuxtLink
            v-for="l in links"
            :key="l.to"
            :to="l.to"
            class="relative text-sm transition"
            :class="isActive(l.to) ? 'text-slate-900 font-medium' : 'text-slate-500 hover:text-slate-900'"
          >
            {{ l.label }}
            <span
              v-if="isActive(l.to)"
              class="absolute -bottom-2 left-0 h-[2px] w-full rounded-full"
              :style="{ backgroundColor: 'rgb(var(--brand-yellow))' }"
            />
          </NuxtLink>
        </nav>

        <!-- Right side -->
        <div class="flex items-center gap-3">
          <NuxtLink to="/announcements" class="btn-brand hidden xs:inline-flex">
            Latest Updates
          </NuxtLink>

          <!-- Mobile menu button -->
          <button
            type="button"
            class="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm md:hidden"
            @click="toggleMobileNav"
            aria-label="Toggle navigation"
          >
            <span v-if="!isMobileNavOpen" class="i-lucide-menu h-4 w-4">
              <span class="block h-0.5 w-4 rounded bg-slate-700"></span>
              <span class="mt-1 block h-0.5 w-4 rounded bg-slate-700"></span>
              <span class="mt-1 block h-0.5 w-4 rounded bg-slate-700"></span>
            </span>
            <span v-else class="i-lucide-x h-4 w-4 relative">
              <span class="block h-0.5 w-4 rotate-45 rounded bg-slate-700"></span>
              <span class="-mt-0.5 block h-0.5 w-4 -rotate-45 rounded bg-slate-700"></span>
            </span>
          </button>
        </div>
      </div>

      <!-- Mobile nav panel -->
      <div
        v-if="isMobileNavOpen"
        class="border-t border-slate-200/70 bg-white/95 backdrop-blur md:hidden"
      >
        <div class="container-x py-3">
          <nav class="flex flex-col gap-1">
            <NuxtLink
              v-for="l in links"
              :key="l.to"
              :to="l.to"
              class="flex items-center justify-between rounded-xl px-3 py-2 text-sm"
              :class="isActive(l.to) ? 'bg-slate-100 text-slate-900 font-medium' : 'text-slate-600 hover:bg-slate-50'"
            >
              <span>{{ l.label }}</span>
            </NuxtLink>
            <NuxtLink
              to="/announcements"
              class="mt-2 inline-flex items-center justify-center rounded-xl bg-[rgb(var(--brand-purple))] px-3 py-2 text-sm font-medium text-white shadow-sm"
            >
              Latest Updates
            </NuxtLink>
          </nav>
        </div>
      </div>
    </header>

    <main class="py-10">
      <NuxtPage />
    </main>

    <div class="soft-divider"></div>

    <footer class="bg-white/60">
      <div class="container-x py-10 text-sm text-slate-500">
        <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p>© {{ new Date().getFullYear() }} Westridge Baptist Church</p>
          <div class="flex gap-5">
            <NuxtLink class="hover:text-slate-900" to="/about">About</NuxtLink>
            <NuxtLink class="hover:text-slate-900" to="/contact">Contact</NuxtLink>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>
