<script setup lang="ts">
import { Query } from 'appwrite'
import { useAppwrite } from '~/lib/appwrite'

const config = useRuntimeConfig()
const { databases } = useAppwrite()

const { data: departments, pending, error } = await useAsyncData('departments', async () => {
  const res = await databases.listDocuments(
    config.public.appwriteDatabaseId,
    config.public.colDepartments,
    [Query.orderAsc('name'), Query.limit(100)]
  )
  return res.documents
})
</script>

<template>
  <div class="mx-auto max-w-5xl p-6">
    <div class="mb-6">
      <h1 class="text-3xl font-semibold">Departments</h1>
      <p class="text-muted-foreground">Find where you can serve and connect.</p>
    </div>

    <div v-if="pending">Loading…</div>
    <div v-else-if="error">Failed to load departments.</div>

    <div v-else class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <UCard v-for="d in departments" :key="d.$id" class="h-full">
        <template #header>
          <h2 class="text-lg font-semibold">{{ d.name }}</h2>
        </template>

        <p class="text-sm leading-relaxed">{{ d.summary }}</p>

        <div class="mt-3 space-y-1 text-sm text-muted-foreground">
          <div v-if="d.leaderName">Leader: {{ d.leaderName }}</div>
          <div v-if="d.meetingInfo">{{ d.meetingInfo }}</div>
        </div>
      </UCard>
    </div>
  </div>
</template>
