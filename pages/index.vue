<script setup lang="ts">
import { Query } from 'appwrite'
import { useAppwrite } from '~/lib/appwrite'

const config = useRuntimeConfig()
const { databases } = useAppwrite()

const { data } = await useAsyncData('home', async () => {
  const [ann, evt, depts] = await Promise.all([
    databases.listDocuments(config.public.appwriteDatabaseId, config.public.colAnnouncements, [
      Query.equal('published', true),
      Query.orderDesc('$createdAt'),
      Query.limit(3),
    ]),
    databases.listDocuments(config.public.appwriteDatabaseId, config.public.colEvents, [
      Query.equal('published', true),
      Query.orderAsc('startAt'),
      Query.limit(1),
    ]),
    databases.listDocuments(config.public.appwriteDatabaseId, config.public.colDepartments, [
      Query.orderAsc('name'),
      Query.limit(6),
    ]),
  ])

  return {
    announcements: ann.documents,
    nextEvent: evt.documents?.[0] ?? null,
    departments: depts.documents,
  }
})
</script>

<template>
  <div class="container-x">
    <!-- HERO -->
    <section class="card-premium overflow-hidden p-8 sm:p-10">
      <div class="grid gap-10 lg:grid-cols-2 lg:items-center">
        <div>
          <div class="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium"
               :style="{ backgroundColor: 'rgba(var(--brand-yellow), 0.25)', color: 'rgb(var(--ink))' }">
            <span class="h-2 w-2 rounded-full" :style="{ backgroundColor: `rgb(var(--brand-purple))` }"></span>
            Welcome to Westridge Baptist Church
          </div>

          <h1 class="mt-5 text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
            Faith. Family. Growth.
          </h1>
          <p class="mt-4 text-base leading-relaxed text-slate-600">
            Announcements, events, departments, and everything happening in church life — all in one place.
          </p>

          <div class="mt-6 flex flex-wrap gap-3">
            <UButton
              to="/announcements"
              class="rounded-xl"
              :style="{ backgroundColor: `rgb(var(--brand-purple))`, color: 'white' }"
            >
              View Announcements
            </UButton>

            <UButton
              to="/events"
              variant="outline"
              class="rounded-xl"
              :style="{ borderColor: 'rgba(var(--brand-purple),0.25)' }"
            >
              Upcoming Events
            </UButton>
          </div>
        </div>

        <!-- Right side accent -->
        <div class="relative">
          <div class="absolute inset-0 rounded-3xl opacity-20 blur-3xl"
               style="background: radial-gradient(closest-side, rgb(var(--brand-purple)) 0%, transparent 70%);"></div>

          <div class="relative card-premium p-6">
            <p class="text-sm font-medium text-slate-900">Next event</p>
            <div v-if="data?.nextEvent" class="mt-3">
              <p class="text-lg font-semibold text-slate-900">{{ data.nextEvent.title }}</p>
              <p class="mt-1 text-sm text-slate-500">
                {{ new Date(data.nextEvent.startAt).toLocaleString() }}
              </p>
              <p v-if="data.nextEvent.location" class="mt-1 text-sm text-slate-500">
                📍 {{ data.nextEvent.location }}
              </p>
              <NuxtLink to="/events" class="mt-3 inline-block text-sm font-medium"
                        :style="{ color: `rgb(var(--brand-purple))` }">
                See all events →
              </NuxtLink>
            </div>
            <div v-else class="mt-3 text-sm text-slate-500">
              No upcoming events posted yet.
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- LATEST ANNOUNCEMENTS -->
    <section class="mt-10">
      <div class="flex items-end justify-between gap-4">
        <div>
          <h2 class="section-title">Latest announcements</h2>
          <p class="section-subtitle">What’s happening this week.</p>
        </div>
        <NuxtLink to="/announcements" class="text-sm font-medium"
                  :style="{ color: `rgb(var(--brand-purple))` }">
          View all →
        </NuxtLink>
      </div>

      <div class="mt-6 grid gap-4 md:grid-cols-3">
        <div v-for="a in data?.announcements" :key="a.$id" class="card-premium p-6">
          <div class="flex items-start justify-between gap-3">
            <p class="font-semibold text-slate-900">{{ a.title }}</p>
            <span v-if="a.pinned" class="rounded-full px-2 py-1 text-xs font-medium"
                  :style="{ backgroundColor: 'rgba(var(--brand-yellow), 0.3)' }">
              Pinned
            </span>
          </div>
          <p class="mt-3 line-clamp-4 text-sm leading-relaxed text-slate-600">
            {{ a.body }}
          </p>
        </div>
      </div>
    </section>

    <!-- DEPARTMENTS -->
    <section class="mt-10">
      <div class="flex items-end justify-between gap-4">
        <div>
          <h2 class="section-title">Departments</h2>
          <p class="section-subtitle">Find where you can serve and connect.</p>
        </div>
        <NuxtLink to="/departments" class="text-sm font-medium"
                  :style="{ color: `rgb(var(--brand-purple))` }">
          Explore →
        </NuxtLink>
      </div>

      <div class="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div v-for="d in data?.departments" :key="d.$id" class="card-premium p-6">
          <p class="font-semibold text-slate-900">{{ d.name }}</p>
          <p class="mt-2 text-sm text-slate-600">{{ d.summary }}</p>
          <p v-if="d.meetingInfo" class="mt-3 text-xs text-slate-500">{{ d.meetingInfo }}</p>
        </div>
      </div>
    </section>
  </div>
</template>
