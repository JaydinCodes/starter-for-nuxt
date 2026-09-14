<script setup lang="ts">
import { computed } from 'vue'
import { Query } from 'appwrite'
import { useAppwrite } from '~/lib/appwrite'

useSeoMeta({
  title: 'Events | Westridge Baptist Church',
  description: 'Upcoming gatherings and church calendar for Westridge Baptist Church.',
})

const config = useRuntimeConfig()
const { databases } = useAppwrite()

const { data, pending, error } = await useAsyncData('events', async () => {
  const res = await databases.listDocuments(
    config.public.appwriteDatabaseId,
    config.public.colEvents,
    [Query.equal('published', true), Query.orderAsc('startAt'), Query.limit(50)]
  )
  return res.documents
})

const featured = computed(() => data.value?.[0] ?? null)
const rest = computed(() => data.value?.slice(1) ?? [])

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })

const formatTime = (iso: string) =>
  new Date(iso).toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' })
</script>

<template>
  <div class="container-x">
    <SectionHeader title="Events" subtitle="Upcoming gatherings and church calendar." />

    <div class="mx-auto mt-8 max-w-3xl">
      <div v-if="pending" class="text-sm text-slate-500">Loading…</div>

      <EmptyState
        v-else-if="error"
        title="Couldn’t load events"
        description="Check Appwrite permissions and collection IDs."
        action-label="Go home"
        action-to="/"
      />

      <EmptyState
        v-else-if="!data?.length"
        title="No upcoming events"
        description="Add events in Appwrite and they’ll appear here automatically."
        action-label="View announcements"
        action-to="/announcements"
      />

      <template v-else>
        <article class="pb-8">
          <p class="text-xs font-semibold uppercase tracking-wide" style="color: rgb(var(--brand-purple))">
            Next up
          </p>
          <h2 class="mt-2 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
            {{ featured.title }}
          </h2>
          <p class="mt-2 text-sm text-slate-500">
            {{ formatDate(featured.startAt) }} · {{ formatTime(featured.startAt) }}
            <span v-if="featured.location"> · {{ featured.location }}</span>
          </p>
          <p v-if="featured.description" class="mt-4 leading-relaxed text-slate-700 whitespace-pre-wrap">
            {{ featured.description }}
          </p>
          <NuxtLink v-if="featured.link" :to="featured.link" class="link-brand mt-3 inline-block text-sm">
            More info →
          </NuxtLink>
          <div class="mt-8 h-px w-16" style="background: rgb(var(--brand-yellow))"></div>
        </article>

        <div v-if="rest.length" class="divide-y divide-slate-200">
          <article v-for="e in rest" :key="e.$id" class="py-5">
            <div class="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <h3 class="text-base font-semibold text-slate-900">{{ e.title }}</h3>
              <p class="whitespace-nowrap text-sm text-slate-500">
                {{ formatDate(e.startAt) }} · {{ formatTime(e.startAt) }}
              </p>
            </div>
            <p v-if="e.location" class="mt-1 text-sm text-slate-500">{{ e.location }}</p>
            <p v-if="e.description" class="mt-2 line-clamp-2 whitespace-pre-wrap text-sm leading-relaxed text-slate-600">
              {{ e.description }}
            </p>
            <NuxtLink v-if="e.link" :to="e.link" class="link-brand mt-2 inline-block text-sm">
              More info →
            </NuxtLink>
          </article>
        </div>
      </template>
    </div>
  </div>
</template>