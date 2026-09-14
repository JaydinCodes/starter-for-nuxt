<script setup lang="ts">
import { computed } from 'vue'
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

const featured = computed(() => {
  if (!data.value?.length) return null
  return data.value.find((a: any) => a.pinned) ?? data.value[0]
})

const rest = computed(() =>
  (data.value ?? []).filter((a: any) => a.$id !== featured.value?.$id)
)

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString(undefined, { month: 'long', day: 'numeric' })
</script>

<template>
  <div class="container-x">
    <SectionHeader title="Announcements" subtitle="Latest updates and church notices." />

    <div class="mx-auto mt-8 max-w-3xl">
      <div v-if="pending" class="text-sm text-slate-500">Loading…</div>

      <EmptyState
        v-else-if="error"
        title="Couldn’t load announcements"
        description="Check Appwrite permissions and collection IDs."
        action-label="Go home"
        action-to="/"
      />

      <EmptyState
        v-else-if="!data?.length"
        title="No announcements yet"
        description="Add announcements in Appwrite and they’ll appear here automatically."
        action-label="Go home"
        action-to="/"
      />

      <template v-else>
        <article class="pb-8">
          <p class="text-xs font-semibold uppercase tracking-wide" style="color: rgb(var(--brand-purple))">
            {{ featured.pinned ? 'Pinned' : 'Latest' }}
          </p>
          <h2 class="mt-2 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
            {{ featured.title }}
          </h2>
          <p class="mt-2 text-sm text-slate-500">{{ formatDate(featured.$createdAt) }}</p>
          <p class="mt-4 leading-relaxed text-slate-700 whitespace-pre-wrap">
            {{ featured.body }}
          </p>
          <div class="mt-8 h-px w-16" style="background: rgb(var(--brand-yellow))"></div>
        </article>

        <div v-if="rest.length" class="divide-y divide-slate-200">
          <article v-for="a in rest" :key="a.$id" class="py-5">
            <div class="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <h3 class="text-base font-semibold text-slate-900">
                {{ a.title }}
                <span v-if="a.pinned" class="ml-2 align-middle text-xs font-medium" style="color: rgb(var(--brand-purple))">
                  Pinned
                </span>
              </h3>
              <p class="whitespace-nowrap text-sm text-slate-500">{{ formatDate(a.$createdAt) }}</p>
            </div>
            <p class="mt-2 line-clamp-3 whitespace-pre-wrap text-sm leading-relaxed text-slate-600">
              {{ a.body }}
            </p>
          </article>
        </div>
      </template>
    </div>
  </div>
</template>