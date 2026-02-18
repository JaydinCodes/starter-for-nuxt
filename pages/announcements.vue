<script setup lang="ts">
import { Query } from 'appwrite'
import { useAppwrite } from '~/lib/appwrite'


const config = useRuntimeConfig()
const { databases } = useAppwrite()

const { data: announcements, pending, error } = await useAsyncData('announcements', async () => {
  const res = await databases.listDocuments(
    config.public.appwriteDatabaseId,
    config.public.colAnnouncements,
    [
      Query.equal('published', true),
      Query.orderDesc('$createdAt'),
      Query.limit(50),
    ]
  )
  return res.documents
})
</script>

<template>
  <div class="mx-auto max-w-4xl p-6">
    <div class="mb-6">
      <h1 class="text-3xl font-semibold">Announcements</h1>
      <p class="text-muted-foreground">Latest updates and church notices.</p>
    </div>

    <div v-if="pending">Loading…</div>
    <div v-else-if="error">Failed to load announcements.</div>

    <div v-else class="space-y-4">
      <UCard v-for="a in announcements" :key="a.$id">
        <template #header>
          <div class="flex items-start justify-between gap-4">
            <h2 class="text-lg font-semibold">{{ a.title }}</h2>
            <UBadge v-if="a.pinned" variant="solid">Pinned</UBadge>
          </div>
        </template>

        <p class="whitespace-pre-wrap leading-relaxed">{{ a.body }}</p>
      </UCard>
    </div>
  </div>
</template>
