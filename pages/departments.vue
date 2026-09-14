<script setup lang="ts">
import { Query } from 'appwrite'
import { useAppwrite } from '~/lib/appwrite'
import { computed } from 'vue'
import { getDepartmentMetaByName } from '~/lib/departments'

useSeoMeta({
  title: 'Departments | Westridge Baptist Church',
  description: 'Explore departments at Westridge Baptist Church and find where you can serve and connect.',
})

const config = useRuntimeConfig()
const { databases } = useAppwrite()

const { data, pending, error } = await useAsyncData('departments', async () => {
  const res = await databases.listDocuments(
    config.public.appwriteDatabaseId,
    config.public.colDepartments,
    [Query.orderAsc('name'), Query.limit(100)]
  )
  return res.documents
})

const themedDepartments = computed(() =>
  (data.value ?? []).map((d: any) => ({
    ...d,
    __meta: getDepartmentMetaByName(d.name),
  }))
)
</script>

<template>
  <div class="container-x">
    <SectionHeader
      title="Departments"
      subtitle="Each department has its own flavour, focus, and family. Find a space that feels like home."
    />

    <div class="mt-6">
      <div v-if="pending" class="card-premium p-6">Loading…</div>

      <div v-else-if="error">
        <EmptyState
          title="Couldn’t load departments"
          description="Check Appwrite permissions and collection IDs."
          action-label="Go home"
          action-to="/"
        />
      </div>

      <div v-else-if="!data?.length">
        <EmptyState
          title="No departments yet"
          description="Add departments in Appwrite and they’ll appear here automatically."
          action-label="View announcements"
          action-to="/announcements"
        />
      </div>

      <div v-else class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <InfoCard
          v-for="d in themedDepartments"
          :key="d.$id"
          :title="d.name"
          eyebrow="Department"
          :right-tag="d.__meta?.shortName"
          :accent-color="d.__meta?.accentColor"
        >
          <p class="line-clamp-3">
            {{ d.summary || d.__meta?.tagline }}
          </p>

          <template #footer>
            <div class="space-y-2 text-sm text-slate-600">
              <p v-if="d.__meta?.tagline" class="text-xs font-medium text-slate-500">
                {{ d.__meta.tagline }}
              </p>

              <p v-if="d.leaderName">
                <span class="font-medium">Leader:</span>
                {{ d.leaderName }}
              </p>

              <p v-if="d.meetingInfo">
                <span class="font-medium">Meet:</span>
                {{ d.meetingInfo }}
              </p>

              <div class="flex flex-wrap items-center justify-between gap-2 pt-2">
                <NuxtLink
                  v-if="d.__meta"
                  :to="`/departments/${d.__meta.slug}`"
                  class="inline-flex items-center gap-1 text-sm font-medium text-slate-900"
                >
                  Learn more
                  <span aria-hidden="true">→</span>
                </NuxtLink>

                <NuxtLink to="/contact" class="link-brand text-sm">
                  Get involved
                </NuxtLink>
              </div>
            </div>
          </template>
        </InfoCard>
      </div>
    </div>
  </div>
</template>
