<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { Query } from 'appwrite'
import { useAppwrite } from '~/lib/appwrite'
import {
  getDepartmentMetaBySlug,
  listDepartmentsMeta,
} from '~/lib/departments'

const route = useRoute()

const slug = computed(() => route.params.slug as string)

const meta = computed(() => getDepartmentMetaBySlug(slug.value))

if (!meta.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Community not found',
  })
}

useSeoMeta({
  title: `${meta.value.name} | Communities | Westridge Baptist Church`,
  description: meta.value.seoDescription,
})

const config = useRuntimeConfig()
const { databases } = useAppwrite()

const {
  data,
  pending,
  error,
} = await useAsyncData(
  () => `community-${slug.value}`,
  async () => {
    const res = await databases.listDocuments(
      config.public.appwriteDatabaseId,
      config.public.colDepartments,
      [
        Query.equal('name', meta.value!.name),
        Query.limit(1),
      ],
    )

    return res.documents?.[0] ?? null
  },
)

const department = computed(() => data.value)

const allDepartments = listDepartmentsMeta()

const selectedSlug = ref(slug.value)

watch(slug, (newSlug) => {
  selectedSlug.value = newSlug
})

watch(selectedSlug, (value) => {
  if (value && value !== slug.value) {
    navigateTo(`/departments/${value}`)
  }
})
</script>

<template>
  <div class="container-x pb-20 pt-10">

    <!-- Breadcrumb -->
    <div class="mb-8 flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-[rgb(var(--muted))]">
      <NuxtLink
        to="/departments"
        class="transition hover:text-[rgb(var(--forest))]"
      >
        Communities
      </NuxtLink>

      <span>/</span>

      <span>{{ meta.shortName }}</span>
    </div>

    <!-- Editorial hero -->
    <section class="border-y border-[rgb(var(--line))] py-12 sm:py-16">
      <div class="grid gap-12 lg:grid-cols-[minmax(0,1.6fr)_minmax(280px,0.7fr)] lg:items-end">

        <div>
          <p class="eyebrow">
            A community at Westridge
          </p>

          <h1 class="editorial-heading mt-4 max-w-4xl">
            {{ meta.name }}
          </h1>

          <p class="mt-6 max-w-2xl text-lg leading-8 text-[rgb(var(--muted))] sm:text-xl">
            {{ meta.tagline }}
          </p>
        </div>

        <div class="border-l border-[rgb(var(--line))] pl-6 lg:pb-2">
          <p class="font-display text-2xl leading-tight text-[rgb(var(--forest))]">
            There is a place for you here.
          </p>

          <p class="mt-3 text-sm leading-6 text-[rgb(var(--muted))]">
            Discover where people gather, grow in faith, build friendships,
            and serve together.
          </p>
        </div>

      </div>
    </section>

    <!-- Community details -->
    <section class="grid gap-12 py-14 lg:grid-cols-[minmax(0,1.6fr)_minmax(260px,0.7fr)]">

      <div>
        <p class="eyebrow">
          About this community
        </p>

        <h2 class="editorial-heading-sm mt-3">
          Life together.
        </h2>

        <div
          v-if="pending"
          class="mt-8 text-sm text-[rgb(var(--muted))]"
        >
          Loading community details...
        </div>

        <div
          v-else-if="error"
          class="mt-8"
        >
          <p class="text-sm leading-6 text-[rgb(var(--muted))]">
            The community information is still being set up.
            Please check back soon or get in touch with the church.
          </p>

          <NuxtLink
            to="/contact"
            class="editorial-link mt-5"
          >
            Contact the church
            <span aria-hidden="true">→</span>
          </NuxtLink>
        </div>

        <div
          v-else
          class="mt-8"
        >
          <p class="max-w-2xl text-base leading-8 text-[rgb(var(--muted))] sm:text-lg">
            {{ department?.summary || meta.seoDescription }}
          </p>

          <div
            v-if="meta.highlights?.length"
            class="mt-10 border-t border-[rgb(var(--line))]"
          >
            <div
              v-for="(point, index) in meta.highlights"
              :key="point"
              class="grid grid-cols-[48px_1fr] border-b border-[rgb(var(--line))] py-5"
            >
              <span class="font-display text-xl text-[rgb(var(--gold))]">
                {{ String(index + 1).padStart(2, '0') }}
              </span>

              <span class="text-sm leading-6 text-[rgb(var(--ink))] sm:text-base">
                {{ point }}
              </span>
            </div>
          </div>

          <blockquote
            v-if="meta.scripture"
            class="mt-10 border-l-2 border-[rgb(var(--gold))] pl-5"
          >
            <p class="font-display text-xl leading-8 text-[rgb(var(--forest))] sm:text-2xl">
              {{ meta.scripture }}
            </p>
          </blockquote>
        </div>
      </div>

      <!-- Details rail -->
      <aside>
        <div class="border-y border-[rgb(var(--line))] py-6">

          <p class="eyebrow">
            Community details
          </p>

          <dl class="mt-6 space-y-6">

            <div v-if="meta.ageRange">
              <dt class="text-xs uppercase tracking-[0.14em] text-[rgb(var(--muted))]">
                Who it is for
              </dt>

              <dd class="mt-1 text-sm font-medium text-[rgb(var(--ink))]">
                {{ meta.ageRange }}
              </dd>
            </div>

            <div v-if="department?.meetingInfo">
              <dt class="text-xs uppercase tracking-[0.14em] text-[rgb(var(--muted))]">
                When we meet
              </dt>

              <dd class="mt-1 text-sm font-medium leading-6 text-[rgb(var(--ink))]">
                {{ department.meetingInfo }}
              </dd>
            </div>

            <div v-if="department?.leaderName">
              <dt class="text-xs uppercase tracking-[0.14em] text-[rgb(var(--muted))]">
                Leader
              </dt>

              <dd class="mt-1 text-sm font-medium text-[rgb(var(--ink))]">
                {{ department.leaderName }}
              </dd>
            </div>

          </dl>
        </div>

        <div class="mt-8">
          <NuxtLink
            to="/contact"
            class="inline-flex w-full items-center justify-center gap-2 bg-[rgb(var(--forest))] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[rgb(var(--ink))]"
          >
            Get connected
            <span aria-hidden="true">→</span>
          </NuxtLink>

          <NuxtLink
            to="/events"
            class="mt-3 inline-flex w-full items-center justify-center border border-[rgb(var(--line))] px-5 py-3 text-sm font-semibold text-[rgb(var(--ink))] transition hover:border-[rgb(var(--forest))] hover:text-[rgb(var(--forest))]"
          >
            See what's happening
          </NuxtLink>
        </div>

        <div
          v-if="department?.contactEmail"
          class="mt-8 border-t border-[rgb(var(--line))] pt-6"
        >
          <p class="eyebrow">
            Contact
          </p>

          <a
            :href="`mailto:${department.contactEmail}`"
            class="mt-2 block break-words text-sm text-[rgb(var(--forest))] underline decoration-[rgb(var(--gold))] underline-offset-4"
          >
            {{ department.contactEmail }}
          </a>
        </div>
      </aside>

    </section>

    <!-- Other communities -->
    <section class="border-t border-[rgb(var(--line))] pt-12">

      <div class="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p class="eyebrow">
            Find your place
          </p>

          <h2 class="editorial-heading-sm mt-2">
            Explore our communities.
          </h2>
        </div>

        <NuxtLink
          to="/departments"
          class="editorial-link"
        >
          View all communities
          <span aria-hidden="true">→</span>
        </NuxtLink>
      </div>

      <div class="mt-8 divide-y divide-[rgb(var(--line))] border-y border-[rgb(var(--line))]">
        <NuxtLink
          v-for="community in allDepartments"
          :key="community.slug"
          :to="`/departments/${community.slug}`"
          class="group flex items-center justify-between gap-6 py-5 transition hover:px-3"
          :class="community.slug === slug ? 'bg-[rgb(var(--paper))]' : ''"
        >
          <div class="flex items-center gap-4">
            <span
              class="h-2 w-2 rounded-full"
              :style="{ backgroundColor: community.accentColor }"
            />

            <span
              class="font-display text-xl text-[rgb(var(--ink))] sm:text-2xl"
            >
              {{ community.name }}
            </span>
          </div>

          <span
            class="text-lg text-[rgb(var(--muted))] transition group-hover:translate-x-1 group-hover:text-[rgb(var(--forest))]"
            aria-hidden="true"
          >
            →
          </span>
        </NuxtLink>
      </div>

    </section>

    <!-- Closing invitation -->
    <section class="mt-16 bg-[rgb(var(--forest))] px-6 py-12 text-white sm:px-10 sm:py-16">

      <p class="text-xs font-semibold uppercase tracking-[0.18em] text-white/60">
        Westridge Baptist Church
      </p>

      <h2 class="mt-4 max-w-3xl font-display text-4xl leading-tight sm:text-5xl">
        The church is more than a Sunday service.
      </h2>

      <p class="mt-5 max-w-2xl text-sm leading-7 text-white/70 sm:text-base">
        It is people sharing life, growing in Christ, caring for one another,
        and serving the community. We'd love for you to be part of it.
      </p>

      <NuxtLink
        to="/contact"
        class="mt-8 inline-flex items-center gap-2 border border-white/30 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white hover:text-[rgb(var(--forest))]"
      >
        Plan a visit
        <span aria-hidden="true">→</span>
      </NuxtLink>

    </section>

  </div>
</template>