<script setup lang="ts">
import { Query } from 'appwrite'
import { useAppwrite } from '~/lib/appwrite'

useSeoMeta({
  title: 'Announcements | Westridge Baptist Church',
  description: 'Latest updates and church notices from Westridge Baptist Church.',
  ogTitle: 'Announcements | Westridge Baptist Church',
  ogDescription: 'Latest updates and church notices from Westridge Baptist Church.',
})

const config = useRuntimeConfig()
const { databases } = useAppwrite()

const { data, pending, error } = await useAsyncData('announcements', async () => {
  const res = await databases.listDocuments(
    config.public.appwriteDatabaseId,
    config.public.colAnnouncements,
    [Query.equal('published', true), Query.orderDesc('$createdAt'), Query.limit(50)]
  )
  return res.documents
})
</script>

<template>
  <div class="container-x">
    <SectionHeader title="Announcements" subtitle="Latest updates and church notices." />

    <div class="mt-6">
      <div v-if="pending" class="card-premium p-6">Loading…</div>

      <div v-else-if="error">
        <EmptyState title="Couldn’t load announcements" description="Check Appwrite permissions and collection IDs." action-label="Go home" action-to="/" />
      </div>

      <div v-else-if="!data?.length">
        <EmptyState title="No announcements yet" description="Add announcements in Appwrite and they’ll appear here automatically." action-label="Go home" action-to="/" />
      </div>

      <div v-else class="grid gap-4 md:grid-cols-2">
        <InfoCard
          v-for="a in data"
          :key="a.$id"
          :title="a.title"
          eyebrow="Update"
          :right-tag="a.pinned ? 'Pinned' : ''"
        >
          <p class="whitespace-pre-wrap">{{ a.body }}</p>
          <template #footer>
            <div class="flex items-center justify-between">
              <span class="text-xs text-slate-500">{{ new Date(a.$createdAt).toLocaleDateString() }}</span>
              <span class="text-xs text-slate-400">Announcement</span>
            </div>
          </template>
        </InfoCard>
      </div>
    </div>
  </div>
</template>
