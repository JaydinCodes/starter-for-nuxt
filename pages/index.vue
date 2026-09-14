<script setup lang="ts">
import { Query } from 'appwrite'
import { computed } from 'vue'

import { useAppwrite } from '~/lib/appwrite'
import { getDepartmentMetaByName } from '~/lib/departments'

useSeoMeta({
  title: 'Westridge Baptist Church',
  description:
    'The life of Westridge Baptist Church. Worship, Scripture, community and service in Mitchells Plain.',
  ogTitle: 'Westridge Baptist Church',
  ogDescription:
    'The life of Westridge Baptist Church. Worship, Scripture, community and service in Mitchells Plain.',
  ogType: 'website',
  twitterCard: 'summary_large_image',
})

const config = useRuntimeConfig()
const { databases } = useAppwrite()

const { data, pending, error } = await useAsyncData('home', async () => {
  const [ann, evt, depts] = await Promise.all([
    databases.listDocuments(
      config.public.appwriteDatabaseId,
      config.public.colAnnouncements,
      [
        Query.equal('published', true),
        Query.orderDesc('$createdAt'),
        Query.limit(3),
      ],
    ),

    databases.listDocuments(
      config.public.appwriteDatabaseId,
      config.public.colEvents,
      [
        Query.equal('published', true),
        Query.orderAsc('startAt'),
        Query.limit(4),
      ],
    ),

    databases.listDocuments(
      config.public.appwriteDatabaseId,
      config.public.colDepartments,
      [Query.orderAsc('name'), Query.limit(6)],
    ),
  ])

  return {
    announcements: ann.documents,
    events: evt.documents,
    nextEvent: evt.documents?.[0] ?? null,
    departments: depts.documents,
  }
})

const formatDate = (iso?: string) => {
  if (!iso) return ''

  return new Date(iso).toLocaleDateString('en-ZA', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  })
}

const formatTime = (iso?: string) => {
  if (!iso) return ''

  return new Date(iso).toLocaleTimeString('en-ZA', {
    hour: '2-digit',
    minute: '2-digit',
  })
}

const featuredDepartments = computed(() =>
  (data.value?.departments ?? []).map((department: any) => ({
    ...department,
    __meta: getDepartmentMetaByName(department.name),
  })),
)
</script>

<template>
  <div class="bg-[rgb(var(--paper))]">

    <!-- =========================================
         HERO
    ========================================== -->

    <section class="container-x pt-8 sm:pt-12 lg:pt-16">
      <div class="grid gap-8 lg:grid-cols-[1.4fr_0.6fr]">

        <!-- Main image -->
        <div class="editorial-image relative min-h-[620px] bg-slate-200 lg:min-h-[720px]">
          <img
            src="/hero.jpg"
            alt="Westridge Baptist Church community"
            class="absolute inset-0"
          />

          <div
            class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent"
          />

          <div class="absolute inset-x-0 bottom-0 p-7 text-white sm:p-10 lg:p-14">
            <p class="eyebrow text-white/80">
              Westridge Baptist Church
            </p>

            <h1
              class="mt-5 max-w-4xl font-display text-5xl leading-[0.95] tracking-[-0.04em] sm:text-6xl lg:text-8xl"
            >
              A people gathered around Christ.
            </h1>

            <p class="mt-6 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg">
              Worshipping together, growing in Scripture, serving our neighbours,
              and sharing life as the people of God.
            </p>

            <div class="mt-8 flex flex-wrap gap-3">
              <NuxtLink
                to="/contact"
                class="bg-white px-5 py-3 text-sm font-medium text-slate-900 transition hover:bg-white/90"
              >
                Visit us
              </NuxtLink>

              <NuxtLink
                to="/departments"
                class="border border-white/50 px-5 py-3 text-sm font-medium text-white transition hover:bg-white/10"
              >
                Find your community
              </NuxtLink>
            </div>
          </div>
        </div>

        <!-- Intro panel -->
        <div class="flex flex-col justify-between border-y border-[rgb(var(--line))] py-8 lg:border-y-0 lg:border-l lg:pl-10">

          <div>
            <p class="eyebrow">
              Sundays at Westridge
            </p>

            <p class="mt-5 font-display text-4xl leading-tight text-[rgb(var(--ink))]">
              Come as you are.
              <br />
              Worship with us.
            </p>

            <div class="mt-8 editorial-rule" />

            <div class="mt-6 space-y-5">
              <div>
                <p class="text-xs font-semibold uppercase tracking-[0.16em] text-[rgb(var(--muted))]">
                  Every Sunday
                </p>

                <p class="mt-1 font-display text-2xl">
                  09:00
                </p>
              </div>

              <div>
                <p class="text-xs font-semibold uppercase tracking-[0.16em] text-[rgb(var(--muted))]">
                  Where
                </p>

                <p class="mt-1 text-sm text-[rgb(var(--muted))]">
                  Mitchells Plain, Cape Town
                </p>
              </div>
            </div>
          </div>

          <div class="mt-12">
            <NuxtLink to="/contact" class="editorial-link">
              Plan your visit
              <span>→</span>
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <!-- =========================================
         INTRO
    ========================================== -->

    <section class="container-x py-24 sm:py-32">
      <div class="grid gap-10 lg:grid-cols-12">

        <div class="lg:col-span-4">
          <p class="eyebrow">
            Who we are
          </p>
        </div>

        <div class="lg:col-span-7 lg:col-start-6">
          <h2 class="editorial-heading">
            The church is more than what happens on Sunday.
          </h2>

          <p class="mt-8 max-w-2xl text-lg leading-relaxed text-[rgb(var(--muted))]">
            Westridge Baptist Church is a community of people learning to
            follow Jesus together. Our life is shaped by Scripture, prayer,
            worship, friendship and service.
          </p>

          <NuxtLink to="/about" class="editorial-link mt-8">
            Learn more about Westridge
            <span>→</span>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- =========================================
         LIFE OF THE CHURCH
    ========================================== -->

    <section class="bg-[rgb(var(--paper-light))] py-24 sm:py-32">
      <div class="container-x">

        <div class="flex items-end justify-between gap-6">
          <div>
            <p class="eyebrow">
              The life of the church
            </p>

            <h2 class="editorial-heading-sm mt-3">
              Stories from Westridge
            </h2>
          </div>

          <NuxtLink
            to="/announcements"
            class="editorial-link hidden sm:inline-flex"
          >
            View all stories
            <span>→</span>
          </NuxtLink>
        </div>

        <div class="mt-12 grid gap-8 lg:grid-cols-12">

          <!-- Featured story -->
          <article
            v-if="data?.announcements?.[0]"
            class="lg:col-span-7"
          >
            <div class="editorial-image aspect-[4/3] bg-slate-200">
              <img
                src="/hero.jpg"
                :alt="data.announcements[0].title"
              />
            </div>

            <div class="mt-6">
              <p class="eyebrow">
                {{ data.announcements[0].pinned ? 'Featured' : 'Church life' }}
              </p>

              <h3 class="mt-3 font-display text-4xl leading-tight sm:text-5xl">
                {{ data.announcements[0].title }}
              </h3>

              <p class="mt-4 max-w-2xl text-[rgb(var(--muted))] leading-relaxed">
                {{ data.announcements[0].body }}
              </p>

              <NuxtLink
                to="/announcements"
                class="editorial-link mt-5"
              >
                Read story
                <span>→</span>
              </NuxtLink>
            </div>
          </article>

          <!-- Secondary stories -->
          <div class="lg:col-span-5">
            <article
              v-for="announcement in data?.announcements?.slice(1)"
              :key="announcement.$id"
              class="border-t border-[rgb(var(--line))] py-7 first:pt-0"
            >
              <p class="eyebrow">
                Church life
              </p>

              <h3 class="mt-3 font-display text-3xl leading-tight">
                {{ announcement.title }}
              </h3>

              <p class="mt-3 line-clamp-3 text-sm leading-relaxed text-[rgb(var(--muted))]">
                {{ announcement.body }}
              </p>

              <NuxtLink
                to="/announcements"
                class="editorial-link mt-4"
              >
                Read more
                <span>→</span>
              </NuxtLink>
            </article>
          </div>
        </div>

        <NuxtLink
          to="/announcements"
          class="editorial-link mt-10 sm:hidden"
        >
          View all stories
          <span>→</span>
        </NuxtLink>
      </div>
    </section>

    <!-- =========================================
         THIS WEEK
    ========================================== -->

    <section class="container-x py-24 sm:py-32">
      <div class="grid gap-12 lg:grid-cols-12">

        <div class="lg:col-span-4">
          <p class="eyebrow">
            This week
          </p>

          <h2 class="editorial-heading-sm mt-3">
            Make space for church life.
          </h2>

          <p class="mt-5 text-sm leading-relaxed text-[rgb(var(--muted))]">
            Gather with us throughout the week for worship, learning,
            fellowship and service.
          </p>

          <NuxtLink to="/events" class="editorial-link mt-7">
            See the full calendar
            <span>→</span>
          </NuxtLink>
        </div>

        <div class="lg:col-span-7 lg:col-start-6">

          <div
            v-if="pending"
            class="py-8 text-sm text-[rgb(var(--muted))]"
          >
            Loading this week's gatherings...
          </div>

          <div
            v-else-if="error"
            class="py-8 text-sm text-[rgb(var(--muted))]"
          >
            We couldn't load the church calendar.
          </div>

          <div v-else-if="data?.events?.length">
            <article
              v-for="event in data.events"
              :key="event.$id"
              class="grid grid-cols-[100px_1fr] gap-6 border-t border-[rgb(var(--line))] py-6"
            >
              <div>
                <p class="text-xs font-semibold uppercase tracking-[0.16em] text-[rgb(var(--muted))]">
                  {{ new Date(event.startAt).toLocaleDateString('en-ZA', {
                    weekday: 'short'
                  }) }}
                </p>

                <p class="mt-1 font-display text-3xl">
                  {{ new Date(event.startAt).getDate() }}
                </p>
              </div>

              <div>
                <h3 class="font-display text-2xl">
                  {{ event.title }}
                </h3>

                <p class="mt-2 text-sm text-[rgb(var(--muted))]">
                  {{ formatDate(event.startAt) }}
                  <span v-if="event.startAt">
                    · {{ formatTime(event.startAt) }}
                  </span>
                </p>

                <p
                  v-if="event.location"
                  class="mt-1 text-sm text-[rgb(var(--muted))]"
                >
                  {{ event.location }}
                </p>
              </div>
            </article>
          </div>

          <div
            v-else
            class="border-t border-[rgb(var(--line))] py-8 text-sm text-[rgb(var(--muted))]"
          >
            No upcoming gatherings have been posted yet.
          </div>
        </div>
      </div>
    </section>

    <!-- =========================================
         COMMUNITIES
    ========================================== -->

    <section class="bg-[rgb(var(--forest))] py-24 text-white sm:py-32">
      <div class="container-x">

        <div class="max-w-2xl">
          <p class="eyebrow text-white/60">
            Our communities
          </p>

          <h2 class="mt-3 font-display text-5xl leading-tight tracking-tight sm:text-6xl">
            There is a place for every generation.
          </h2>

          <p class="mt-6 text-white/65 leading-relaxed">
            From children and young people to adults and families,
            our communities are places to grow, serve and belong.
          </p>
        </div>

        <div class="mt-14 grid border-t border-white/20 sm:grid-cols-2 lg:grid-cols-3">
          <NuxtLink
            v-for="department in featuredDepartments"
            :key="department.$id"
            :to="
              department.__meta
                ? `/departments/${department.__meta.slug}`
                : '/departments'
            "
            class="group border-b border-white/20 p-6 transition hover:bg-white/5 sm:p-8"
          >
            <p class="text-xs uppercase tracking-[0.16em] text-white/45">
              Community
            </p>

            <h3 class="mt-3 font-display text-3xl">
              {{ department.name }}
            </h3>

            <p class="mt-3 text-sm leading-relaxed text-white/60">
              {{ department.summary || department.__meta?.tagline }}
            </p>

            <span class="mt-6 inline-block text-sm text-white/80">
              Explore →
            </span>
          </NuxtLink>
        </div>

        <NuxtLink
          to="/departments"
          class="mt-10 inline-flex border border-white/30 px-5 py-3 text-sm font-medium transition hover:bg-white hover:text-[rgb(var(--forest))]"
        >
          Explore all communities
        </NuxtLink>
      </div>
    </section>

    <!-- =========================================
         SCRIPTURE
    ========================================== -->

    <section class="container-x py-24 sm:py-32">
      <div class="mx-auto max-w-4xl text-center">

        <p class="eyebrow">
          Scripture
        </p>

        <blockquote class="mt-8 font-display text-4xl leading-tight tracking-tight text-[rgb(var(--ink))] sm:text-5xl lg:text-6xl">
          “Let us consider how we may spur one another on toward love and good deeds.”
        </blockquote>

        <p class="mt-8 text-xs font-semibold uppercase tracking-[0.2em] text-[rgb(var(--muted))]">
          Hebrews 10:24
        </p>
      </div>
    </section>

    <!-- =========================================
         VISIT
    ========================================== -->

    <section class="border-t border-[rgb(var(--line))]">
      <div class="container-x grid lg:grid-cols-2">

        <div class="py-20 pr-0 lg:pr-16 lg:py-28">
          <p class="eyebrow">
            Visit Westridge
          </p>

          <h2 class="editorial-heading mt-4">
            We'd love to welcome you.
          </h2>

          <p class="mt-7 max-w-xl text-lg leading-relaxed text-[rgb(var(--muted))]">
            Whether you're joining us for the first time or you've been part
            of Westridge for years, there is a place for you here.
          </p>

          <div class="mt-8 flex flex-wrap gap-3">
            <NuxtLink to="/contact" class="btn-primary">
              Plan your visit
            </NuxtLink>

            <NuxtLink to="/about" class="btn-secondary">
              About the church
            </NuxtLink>
          </div>
        </div>

        <div class="editorial-image min-h-[420px] lg:min-h-0">
          <img
            src="/hero.jpg"
            alt="Westridge Baptist Church"
          />
        </div>

      </div>
    </section>

  </div>
</template>