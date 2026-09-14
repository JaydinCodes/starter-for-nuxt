<script setup lang="ts">
import { ref } from 'vue'

const route = useRoute()

const links = [
  { label: 'The Church', to: '/about' },
  { label: 'Communities', to: '/departments' },
  { label: 'This Week', to: '/events' },
  { label: 'Stories', to: '/announcements' },
  { label: 'Visit', to: '/contact' },
]

const isMobileNavOpen = ref(false)

const isActive = (to: string) => route.path === to

watch(
  () => route.path,
  () => {
    isMobileNavOpen.value = false
  },
)
</script>

<template>
  <div class="min-h-screen bg-[rgb(var(--paper))] text-[rgb(var(--ink))]">

    <header class="sticky top-0 z-50 border-b border-[rgb(var(--line))] bg-[rgba(246,242,233,0.94)] backdrop-blur-md">
      <div class="container-x flex h-20 items-center justify-between">

        <!-- Brand -->
        <NuxtLink to="/" class="flex items-center gap-3">
          <img
            src="/logo.svg"
            alt="Westridge Baptist Church"
            class="h-9 w-9"
          />

          <div class="leading-none">
            <div class="font-display text-xl">
              Westridge
            </div>

            <div class="mt-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[rgb(var(--muted))]">
              Baptist Church
            </div>
          </div>
        </NuxtLink>

        <!-- Desktop navigation -->
        <nav class="hidden items-center gap-8 md:flex">
          <NuxtLink
            v-for="link in links"
            :key="link.to"
            :to="link.to"
            class="relative text-sm transition"
            :class="
              isActive(link.to)
                ? 'text-[rgb(var(--forest))]'
                : 'text-[rgb(var(--muted))] hover:text-[rgb(var(--ink))]'
            "
          >
            {{ link.label }}

            <span
              v-if="isActive(link.to)"
              class="absolute -bottom-2 left-0 h-px w-full bg-[rgb(var(--gold))]"
            />
          </NuxtLink>
        </nav>

        <!-- Desktop CTA -->
        <NuxtLink
          to="/contact"
          class="btn-primary hidden md:inline-flex"
        >
          Visit us
        </NuxtLink>

        <!-- Mobile -->
        <button
          type="button"
          class="flex h-10 w-10 items-center justify-center border border-[rgb(var(--line))] md:hidden"
          aria-label="Toggle navigation"
          @click="isMobileNavOpen = !isMobileNavOpen"
        >
          <span class="text-lg">
            {{ isMobileNavOpen ? '×' : '☰' }}
          </span>
        </button>
      </div>

      <!-- Mobile navigation -->
      <div
        v-if="isMobileNavOpen"
        class="border-t border-[rgb(var(--line))] bg-[rgb(var(--paper))] md:hidden"
      >
        <nav class="container-x flex flex-col py-4">
          <NuxtLink
            v-for="link in links"
            :key="link.to"
            :to="link.to"
            class="border-b border-[rgb(var(--line))] py-4 text-sm"
          >
            {{ link.label }}
          </NuxtLink>

          <NuxtLink
            to="/contact"
            class="btn-primary mt-4"
          >
            Visit us
          </NuxtLink>
        </nav>
      </div>
    </header>

    <main>
      <NuxtPage />
    </main>

    <footer class="border-t border-[rgb(var(--line))] bg-[rgb(var(--forest))] text-white">
      <div class="container-x py-14">

        <div class="grid gap-12 md:grid-cols-2 lg:grid-cols-4">

          <div class="lg:col-span-2">
            <p class="font-display text-3xl">
              Westridge Baptist Church
            </p>

            <p class="mt-4 max-w-md text-sm leading-relaxed text-white/60">
              A people gathered around Christ.
              Worshipping, growing, serving and sharing life together.
            </p>
          </div>

          <div>
            <p class="text-xs font-semibold uppercase tracking-[0.18em] text-white/40">
              Explore
            </p>

            <nav class="mt-4 flex flex-col gap-3 text-sm text-white/70">
              <NuxtLink to="/about">The Church</NuxtLink>
              <NuxtLink to="/departments">Communities</NuxtLink>
              <NuxtLink to="/events">This Week</NuxtLink>
              <NuxtLink to="/announcements">Stories</NuxtLink>
            </nav>
          </div>

          <div>
            <p class="text-xs font-semibold uppercase tracking-[0.18em] text-white/40">
              Visit
            </p>

            <div class="mt-4 space-y-3 text-sm text-white/70">
              <p>Sunday · 09:00</p>
              <p>Mitchells Plain</p>

              <NuxtLink
                to="/contact"
                class="inline-block text-white underline underline-offset-4"
              >
                Get in touch
              </NuxtLink>
            </div>
          </div>
        </div>

        <div class="mt-14 border-t border-white/15 pt-6 text-xs text-white/40">
          © {{ new Date().getFullYear() }} Westridge Baptist Church
        </div>

      </div>
    </footer>

  </div>
</template>