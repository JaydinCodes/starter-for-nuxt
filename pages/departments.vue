<script setup lang="ts">
import { computed } from 'vue'
import { Query } from 'appwrite'

import { useAppwrite } from '~/lib/appwrite'
import { getDepartmentMetaByName } from '~/lib/departments'

useSeoMeta({
  title: 'Communities | Westridge Baptist Church',
  description:
    'Find a community at Westridge Baptist Church where you can connect, grow and serve.',
})

const config = useRuntimeConfig()
const { databases } = useAppwrite()

const { data, pending, error } = await useAsyncData(
  'departments',
  async () => {
    const res = await databases.listDocuments(
      config.public.appwriteDatabaseId,
      config.public.colDepartments,
      [
        Query.orderAsc('name'),
        Query.limit(100),
      ],
    )

    return res.documents
  },
)

const communities = computed(() =>
  (data.value ?? []).map((department: any) => ({
    ...department,
    __meta: getDepartmentMetaByName(department.name),
  })),
)
</script>

<template>
  <div>

    <!-- HEADER -->
    <section class="container-x pt-12 sm:pt-16 lg:pt-20">

      <p class="eyebrow">
        Our communities
      </p>

      <h1 class="editorial-heading mt-4">
        There is a place
        <br />
        for you here.
      </h1>

      <p class="mt-7 max-w-2xl text-lg leading-relaxed text-[rgb(var(--muted))]">
        Church life happens in community. Find people to worship with,
        learn with, serve with and grow alongside.
      </p>

    </section>

    <!-- COMMUNITIES -->
    <section class="container-x py-20 sm:py-28">

      <div
        v-if="pending"
        class="text-sm text-[rgb(var(--muted))]"
      >
        Loading communities...
      </div>

      <EmptyState
        v-else-if="error"
        title="Couldn't load communities"
        description="Check Appwrite permissions and collection IDs."
        action-label="Go home"
        action-to="/"
      />

      <EmptyState
        v-else-if="!data?.length"
        title="No communities yet"
        description="Communities will appear here when they are added."
        action-label="Go home"
        action-to="/"
      />

      <div
        v-else
        class="border-t border-[rgb(var(--line))]"
      >

        <NuxtLink
          v-for="community in communities"
          :key="community.$id"
          :to="
            community.__meta
              ? `/departments/${community.__meta.slug}`
              : '/departments'
          "
          class="group grid gap-5 border-b border-[rgb(var(--line))] py-8 transition hover:bg-[rgb(var(--paper-light))] sm:grid-cols-[180px_1fr_160px]"
        >

          <div>
            <p class="eyebrow">
              Community
            </p>

            <p
              v-if="community.__meta?.shortName"
              class="mt-2 text-xs text-[rgb(var(--muted))]"
            >
              {{ community.__meta.shortName }}
            </p>
          </div>

          <div>
            <h2 class="font-display text-4xl leading-tight">
              {{ community.name }}
            </h2>

            <p class="mt-3 max-w-2xl leading-relaxed text-[rgb(var(--muted))]">
              {{ community.summary || community.__meta?.tagline }}
            </p>

            <div class="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm text-[rgb(var(--muted))]">
              <span v-if="community.leaderName">
                Led by {{ community.leaderName }}
              </span>

              <span v-if="community.meetingInfo">
                {{ community.meetingInfo }}
              </span>
            </div>
          </div>

          <div class="flex items-center sm:justify-end">
            <span class="editorial-link">
              Explore
              <span class="transition group-hover:translate-x-1">
                →
              </span>
            </span>
          </div>

        </NuxtLink>

      </div>
    </section>

  </div>
</template>