<script setup lang="ts">
import { Query } from 'appwrite'
import { computed } from 'vue'
import { useAppwrite } from '~/lib/appwrite'
import { getDepartmentMetaByName } from '~/lib/departments'

useSeoMeta({
  title: 'Westridge Baptist Church',
  description: 'Announcements, events, departments, and everything happening in church life.',
  ogTitle: 'Westridge Baptist Church',
  ogDescription: 'Announcements, events, departments, and everything happening in church life.',
  ogType: 'website',
  twitterCard: 'summary_large_image',
})

const config = useRuntimeConfig()
const { databases } = useAppwrite()

const { data, pending, error } = await useAsyncData('home', async () => {
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

const formatDate = (iso?: string) => (iso ? new Date(iso).toLocaleString() : '')

const featuredDepartments = computed(() =>
  (data.value?.departments ?? []).map((d: any) => ({
    ...d,
    __meta: getDepartmentMetaByName(d.name),
  }))
)
</script>

<template>
  <div class="container-x space-y-12">
    <!-- HERO -->
    <section class="relative overflow-hidden rounded-[2rem] border border-slate-200/60 bg-white/70 shadow-[0_16px_70px_rgba(15,23,42,0.10)]">
      <div class="absolute inset-0">
        <div class="absolute inset-0 bg-cover bg-center" style="background-image: url('/hero.jpg')"></div>
        <div class="absolute inset-0 bg-gradient-to-br from-purple-950/70 via-purple-900/45 to-yellow-400/20"></div>
      </div>

      <div class="relative grid gap-10 p-10 lg:grid-cols-2 lg:items-end">
        <div class="text-white">
          <Pill label="Welcome" />
          <h1 class="mt-5 text-4xl font-semibold tracking-tight sm:text-5xl">
            Westridge Baptist Church
          </h1>
          <p class="mt-4 max-w-xl text-white/85 leading-relaxed">
            A place to grow in faith, connect in community, and serve with purpose.
          </p>

          <div class="mt-7 flex flex-wrap gap-3">
            <NuxtLink to="/announcements" class="rounded-2xl bg-yellow-400 px-5 py-2.5 font-semibold text-slate-900 shadow-sm hover:shadow-md transition">
              Latest Announcements
            </NuxtLink>
            <NuxtLink to="/events" class="btn-outline bg-white/10 text-white border-white/25 hover:bg-white/15">
              Upcoming Events
            </NuxtLink>
          </div>

          <div class="mt-6 flex flex-wrap gap-3 text-sm text-white/80">
            <span class="rounded-full bg-white/10 px-3 py-1">Sundays • 09:00</span>
            <span class="rounded-full bg-white/10 px-3 py-1">Mitchells Plain</span>
            <span class="rounded-full bg-white/10 px-3 py-1">All welcome</span>
          </div>
        </div>

        <div class="card-premium p-6">
          <p class="text-sm font-semibold text-slate-900">Next event</p>

          <div v-if="pending" class="mt-3 text-sm text-slate-500">Loading…</div>
          <div v-else-if="error" class="mt-3 text-sm text-slate-500">Couldn’t load.</div>

          <div v-else-if="data?.nextEvent" class="mt-3">
            <p class="text-lg font-semibold text-slate-900">{{ data.nextEvent.title }}</p>
            <p class="mt-1 text-sm text-slate-500">{{ formatDate(data.nextEvent.startAt) }}</p>
            <p v-if="data.nextEvent.location" class="mt-1 text-sm text-slate-500">📍 {{ data.nextEvent.location }}</p>
            <NuxtLink to="/events" class="mt-4 inline-block link-brand">See all events →</NuxtLink>
          </div>

          <div v-else class="mt-3 text-sm text-slate-500">
            No upcoming events posted yet.
          </div>
        </div>
      </div>
    </section>

    <!-- MISSION STRIP -->
    <section class="card-premium p-8">
      <div class="grid gap-6 lg:grid-cols-3">
        <div class="lg:col-span-2">
          <h2 class="text-2xl font-semibold tracking-tight text-slate-900">Our mission</h2>
          <p class="mt-2 text-slate-600 leading-relaxed">
            We exist to glorify God by proclaiming the gospel, growing disciples, and serving our community with love and truth.
          </p>
        </div>
        <div class="flex items-center justify-start lg:justify-end">
          <NuxtLink to="/about" class="btn-brand">Learn more</NuxtLink>
        </div>
      </div>
    </section>

    <!-- ANNOUNCEMENTS -->
    <section>
      <SectionHeader
        title="Latest announcements"
        subtitle="What’s happening this week."
        to="/announcements"
        link-label="View all"
      />

      <div class="mt-6 grid gap-4 md:grid-cols-3">
        <div v-if="!pending && !error && !(data?.announcements?.length)" class="md:col-span-3">
          <EmptyState title="No announcements yet" description="Add announcements in Appwrite and they’ll appear here." action-label="Go to announcements" action-to="/announcements" />
        </div>

        <InfoCard
          v-for="a in data?.announcements"
          :key="a.$id"
          :title="a.title"
          eyebrow="Update"
          :right-tag="a.pinned ? 'Pinned' : ''"
        >
          <p class="line-clamp-4 whitespace-pre-wrap">{{ a.body }}</p>
          <template #footer>
            <div class="flex items-center justify-between">
              <span class="text-xs text-slate-500">{{ new Date(a.$createdAt).toLocaleDateString() }}</span>
              <NuxtLink to="/announcements" class="link-brand text-sm">Read more →</NuxtLink>
            </div>
          </template>
        </InfoCard>
      </div>
    </section>

    <!-- DEPARTMENTS HORIZONTAL SCROLLER -->
    <section>
      <SectionHeader
        title="Find your people"
        subtitle="Every department has its own rhythm, age group, and story. Start exploring a few below."
        to="/departments"
        link-label="View all departments"
      />

      <div class="mt-6 overflow-hidden">
        <div class="-mx-4 overflow-x-auto pb-2">
          <div class="flex gap-4 px-4 md:grid md:grid-cols-3 md:gap-4 md:px-0">
            <InfoCard
              v-for="d in featuredDepartments"
              :key="d.$id"
              :title="d.name"
              eyebrow="Department"
              :right-tag="d.__meta?.shortName"
              :accent-color="d.__meta?.accentColor"
              class="min-w-[260px] md:min-w-0"
            >
              <p class="line-clamp-3">
                {{ d.summary || d.__meta?.tagline }}
              </p>
              <template #footer>
                <div class="flex flex-wrap items-center justify-between gap-2">
                  <span class="text-xs text-slate-500">
                    {{ d.meetingInfo || 'Ask us when they meet' }}
                  </span>
                  <div class="flex gap-3">
                    <NuxtLink
                      v-if="d.__meta"
                      :to="`/departments/${d.__meta.slug}`"
                      class="text-xs font-medium text-slate-900"
                    >
                      Details →
                    </NuxtLink>
                    <NuxtLink to="/contact" class="link-brand text-xs">
                      Join
                    </NuxtLink>
                  </div>
                </div>
              </template>
            </InfoCard>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
