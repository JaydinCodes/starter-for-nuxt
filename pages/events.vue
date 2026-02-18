<script setup lang="ts">
import { Query } from 'appwrite'
import { useAppwrite } from '~/lib/appwrite'

const config = useRuntimeConfig()
const { databases } = useAppwrite()

const { data: events, pending, error } = await useAsyncData('events', async () => {
  const res = await databases.listDocuments(
    config.public.appwriteDatabaseId,
    config.public.colEvents,
    [
      Query.equal('published', true),
      Query.orderAsc('startAt'),
      Query.limit(50),
    ]
  )
  return res.documents
})
</script>

<template>
  <div class="mx-auto max-w-4xl p-6">
    <div class="mb-6">
      <h1 class="text-3xl font-semibold">Events</h1>
      <p class="text-muted-foreground">Upcoming gatherings and church calendar.</p>
    </div>

    <div v-if="pending">Loading…</div>
    <div v-else-if="error">Failed to load events.</div>

    <div v-else class="space-y-4">
      <UCard v-for="e in events" :key="e.$id">
        <template #header>
          <div class="flex items-start justify-between gap-4">
            <h2 class="text-lg font-semibold">{{ e.title }}</h2>
            <span class="text-sm text-muted-foreground">{{ new Date(e.startAt).toLocaleString() }}</span>
          </div>
        </template>

        <p v-if="e.description" class="whitespace-pre-wrap">{{ e.description }}</p>
        <p v-if="e.location" class="mt-2 text-sm text-muted-foreground">📍 {{ e.location }}</p>
        <NuxtLink v-if="e.link" :to="e.link" class="mt-2 inline-block underline">More info</NuxtLink>
      </UCard>
    </div>
  </div>
</template>
