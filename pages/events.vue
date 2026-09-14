<script setup lang="ts">
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

const formatDate = (iso: string) => new Date(iso).toLocaleString()
</script>

<template>
  <div class="container-x">
    <SectionHeader title="Events" subtitle="Upcoming gatherings and church calendar." />

    <div class="mt-6">
      <div v-if="pending" class="card-premium p-6">Loading…</div>

      <div v-else-if="error">
        <EmptyState title="Couldn’t load events" description="Check Appwrite permissions and collection IDs." action-label="Go home" action-to="/" />
      </div>

      <div v-else-if="!data?.length">
        <EmptyState title="No upcoming events" description="Add events in Appwrite and they’ll appear here automatically." action-label="View announcements" action-to="/announcements" />
      </div>

      <div v-else class="grid gap-4 lg:grid-cols-2">
        <InfoCard v-for="e in data" :key="e.$id" :title="e.title" eyebrow="Event">
          <div class="space-y-2">
            <p class="text-sm text-slate-700"><span class="font-medium">When:</span> {{ formatDate(e.startAt) }}</p>
            <p v-if="e.location" class="text-sm text-slate-700"><span class="font-medium">Where:</span> {{ e.location }}</p>
            <p v-if="e.description" class="whitespace-pre-wrap">{{ e.description }}</p>
            <NuxtLink v-if="e.link" :to="e.link" class="link-brand text-sm">More info →</NuxtLink>
          </div>
        </InfoCard>
      </div>
    </div>
  </div>
</template>
