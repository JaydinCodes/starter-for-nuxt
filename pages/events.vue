<script setup lang="ts">
import { computed } from 'vue'
import { Query } from 'appwrite'

import { useAppwrite } from '~/lib/appwrite'

useSeoMeta({
  title: 'This Week | Westridge Baptist Church',
  description:
    'Upcoming gatherings, worship and events at Westridge Baptist Church.',
})

const config = useRuntimeConfig()
const { databases } = useAppwrite()

const { data, pending, error } = await useAsyncData(
  'events',
  async () => {
    const res = await databases.listDocuments(
      config.public.appwriteDatabaseId,
      config.public.colEvents,
      [
        Query.equal('published', true),
        Query.orderAsc('startAt'),
        Query.limit(50),
      ],
    )

    return res.documents
  },
)

const featured = computed(() => data.value?.[0] ?? null)
const rest = computed(() => data.value?.slice(1) ?? [])

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString('en-ZA', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  })

const formatTime = (iso: string) =>
  new Date(iso).toLocaleTimeString('en-ZA', {
    hour: 'numeric',
    minute: '2-digit',
  })
</script>

<template>
  <div>

    <!-- HEADER -->
    <section class="container-x pt-12 sm:pt-16 lg:pt-20">

      <p class="eyebrow">
        Gather with us
      </p>

      <h1 class="editorial-heading mt-4">
        This week
        <br />
        at Westridge.
      </h1>

      <p class="mt-7 max-w-2xl text-lg leading-relaxed text-[rgb(var(--muted))]">
        Worship, Scripture, fellowship and opportunities to serve
        throughout the week.
      </p>

    </section>

    <!-- EVENTS -->
    <section class="container-x py-20 sm:py-28">

      <div
        v-if="pending"
        class="text-sm text-[rgb(var(--muted))]"
      >
        Loading the church calendar...
      </div>

      <EmptyState
        v-else-if="error"
        title="Couldn't load events"
        description="Check Appwrite permissions and collection IDs."
        action-label="Go home"
        action-to="/"
      />

      <EmptyState
        v-else-if="!data?.length"
        title="Nothing scheduled yet"
        description="Upcoming gatherings will appear here when they are published."
        action-label="View church life"
        action-to="/announcements"
      />

      <template v-else>

        <!-- FEATURED EVENT -->
        <article class="grid gap-10 border-y border-[rgb(var(--line))] py-10 lg:grid-cols-12">

          <div class="lg:col-span-4">

            <p class="eyebrow">
              Next gathering
            </p>

            <p class="mt-5 font-display text-6xl leading-none">
              {{ new Date(featured.startAt).getDate() }}
            </p>

            <p class="mt-2 text-sm uppercase tracking-[0.15em] text-[rgb(var(--muted))]">
              {{
                new Date(featured.startAt).toLocaleDateString('en-ZA', {
                  month: 'long',
                })
              }}
            </p>

          </div>

          <div class="lg:col-span-8">

            <h2 class="font-display text-4xl leading-tight sm:text-5xl">
              {{ featured.title }}
            </h2>

            <div class="mt-4 text-sm text-[rgb(var(--muted))]">
              {{ formatDate(featured.startAt) }}
              ·
              {{ formatTime(featured.startAt) }}

              <span v-if="featured.location">
                · {{ featured.location }}
              </span>
            </div>

            <p
              v-if="featured.description"
              class="mt-6 max-w-2xl leading-relaxed text-[rgb(var(--muted))]"
            >
              {{ featured.description }}
            </p>

            <NuxtLink
              v-if="featured.link"
              :to="featured.link"
              class="editorial-link mt-6"
            >
              More information
              <span>→</span>
            </NuxtLink>

          </div>

        </article>

        <!-- REST -->
        <div
          v-if="rest.length"
          class="mt-16 border-t border-[rgb(var(--line))]"
        >

          <article
            v-for="event in rest"
            :key="event.$id"
            class="grid gap-6 border-b border-[rgb(var(--line))] py-8 md:grid-cols-[140px_1fr_180px]"
          >

            <div>
              <p class="text-xs font-semibold uppercase tracking-[0.16em] text-[rgb(var(--muted))]">
                {{
                  new Date(event.startAt).toLocaleDateString('en-ZA', {
                    weekday: 'short',
                  })
                }}
              </p>

              <p class="mt-1 font-display text-3xl">
                {{ new Date(event.startAt).getDate() }}
              </p>
            </div>

            <div>
              <h3 class="font-display text-3xl">
                {{ event.title }}
              </h3>

              <p
                v-if="event.description"
                class="mt-3 line-clamp-2 text-sm leading-relaxed text-[rgb(var(--muted))]"
              >
                {{ event.description }}
              </p>
            </div>

            <div class="text-sm text-[rgb(var(--muted))] md:text-right">
              <p>
                {{ formatTime(event.startAt) }}
              </p>

              <p
                v-if="event.location"
                class="mt-1"
              >
                {{ event.location }}
              </p>

              <NuxtLink
                v-if="event.link"
                :to="event.link"
                class="editorial-link mt-3"
              >
                More info →
              </NuxtLink>
            </div>

          </article>

        </div>

      </template>

    </section>

    <!-- SUNDAY -->
    <section class="bg-[rgb(var(--forest))] py-24 text-white sm:py-32">
      <div class="container-x grid gap-10 lg:grid-cols-2 lg:items-center">

        <div>
          <p class="eyebrow text-white/60">
            Every Sunday
          </p>

          <h2 class="mt-4 font-display text-5xl leading-tight sm:text-6xl">
            Make Sunday part of your week.
          </h2>
        </div>

        <div class="lg:pl-16">

          <p class="text-lg leading-relaxed text-white/65">
            Join us at 09:00 for worship, Scripture, prayer and fellowship.
            Everyone is welcome.
          </p>

          <NuxtLink
            to="/contact"
            class="mt-8 inline-flex border border-white/30 px-5 py-3 text-sm font-medium transition hover:bg-white hover:text-[rgb(var(--forest))]"
          >
            Plan your visit
          </NuxtLink>

        </div>

      </div>
    </section>

  </div>
</template>