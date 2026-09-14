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
      [
        Query.orderAsc('name'),
        Query.limit(6),
      ],
    ),
  ])

  return {
    announcements: ann.documents,
    events: evt.documents,
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

const featuredStory = computed(() => data.value?.announcements?.[0] ?? null)

const secondaryStories = computed(
  () => data.value?.announcements?.slice(1) ?? [],
)

const upcomingEvents = computed(
  () => data.value?.events ?? [],
)
</script>

<template>
  <main class="overflow-hidden bg-[rgb(var(--paper))]">

    <!-- =====================================================
         HERO
    ====================================================== -->

    <section class="container-x pt-6 sm:pt-10 lg:pt-14">

      <div class="relative min-h-[680px] overflow-hidden bg-[rgb(var(--plum))] lg:min-h-[780px]">

        <!-- Illustration -->
        <img
          src="/hero.jpg"
          alt="The Westridge Baptist Church community"
          class="absolute inset-0 h-full w-full object-cover mix-blend-luminosity opacity-70"
        />

        <!-- Color treatment -->
        <div class="absolute inset-0 bg-[rgb(var(--plum))]/70" />

        <div class="absolute inset-0 bg-gradient-to-t from-[rgb(var(--plum))] via-[rgb(var(--plum))]/20 to-transparent" />

        <!-- Gold detail -->
        <div class="absolute right-8 top-8 h-3 w-3 rounded-full bg-[rgb(var(--gold))] sm:right-12 sm:top-12" />

        <!-- Hero content -->
        <div class="relative flex min-h-[680px] flex-col justify-between p-7 text-white sm:p-10 lg:min-h-[780px] lg:p-14">

          <div class="flex items-start justify-between gap-8">

            <p class="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
              Westridge Baptist Church
            </p>

            <p class="hidden max-w-[180px] text-right text-xs leading-5 text-white/60 sm:block">
              Mitchells Plain
              <br />
              Cape Town
            </p>

          </div>

          <div class="max-w-5xl">

            <p class="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-[rgb(var(--gold))]">
              A church for the whole of life
            </p>

            <h1 class="max-w-4xl font-display text-6xl leading-[0.88] tracking-[-0.045em] sm:text-7xl lg:text-[9rem]">
              A people
              <br />
              gathered
              <br />
              around Christ.
            </h1>

            <div class="mt-8 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">

              <p class="max-w-lg text-base leading-7 text-white/75 sm:text-lg">
                Worshipping together, growing in Scripture,
                serving our neighbours and sharing life as
                the people of God.
              </p>

              <NuxtLink
                to="/contact"
                class="group inline-flex w-fit items-center gap-4 border border-white/30 px-5 py-3 text-sm font-semibold text-white transition hover:border-[rgb(var(--gold))] hover:bg-[rgb(var(--gold))] hover:text-[rgb(var(--plum))]"
              >
                Visit us

                <span class="transition-transform group-hover:translate-x-1">
                  →
                </span>
              </NuxtLink>

            </div>

          </div>

        </div>

      </div>

    </section>


    <!-- =====================================================
         INTRO
    ====================================================== -->

    <section class="container-x py-24 sm:py-32 lg:py-40">

      <div class="grid gap-12 lg:grid-cols-12 lg:gap-8">

        <div class="lg:col-span-3">

          <p class="eyebrow text-[rgb(var(--plum))]">
            The church
          </p>

          <div class="mt-5 h-px w-12 bg-[rgb(var(--gold))]" />

        </div>

        <div class="lg:col-span-7 lg:col-start-5">

          <h2 class="font-display text-5xl leading-[0.98] tracking-[-0.025em] text-[rgb(var(--ink))] sm:text-6xl lg:text-7xl">
            The church is more than what happens on Sunday.
          </h2>

          <p class="mt-8 max-w-2xl text-lg leading-8 text-[rgb(var(--muted))]">
            Westridge Baptist Church is a community of people learning
            to follow Jesus together. Our life is shaped by Scripture,
            prayer, worship, friendship and service.
          </p>

          <NuxtLink
            to="/about"
            class="editorial-link mt-8"
          >
            Discover who we are
            <span>→</span>
          </NuxtLink>

        </div>

      </div>

    </section>


    <!-- =====================================================
         CHURCH LIFE
    ====================================================== -->

    <section class="container-x pb-24 sm:pb-32 lg:pb-40">

      <div class="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">

        <!-- Illustration -->
        <div class="relative order-2 lg:order-1 lg:col-span-7">

          <div class="editorial-image aspect-[4/3] bg-[rgb(var(--plum))]">

            <img
              src="/church-life.jpg"
              alt="People sharing life together at Westridge Baptist Church"
              class="h-full w-full object-cover"
            />

          </div>

          <!-- Floating label -->
          <div class="absolute -bottom-6 left-6 bg-[rgb(var(--gold))] px-5 py-4 text-[rgb(var(--plum))] sm:left-10">

            <p class="text-[10px] font-bold uppercase tracking-[0.18em]">
              Life together
            </p>

            <p class="mt-1 font-display text-2xl">
              Faith in community.
            </p>

          </div>

        </div>

        <!-- Copy -->
        <div class="order-1 lg:order-2 lg:col-span-4 lg:col-start-9">

          <p class="eyebrow text-[rgb(var(--plum))]">
            The life of the church
          </p>

          <h2 class="mt-4 font-display text-5xl leading-[0.95] text-[rgb(var(--ink))] sm:text-6xl">
            We live this life together.
          </h2>

          <p class="mt-7 text-base leading-7 text-[rgb(var(--muted))]">
            Church happens around tables, in homes, in prayer,
            in Scripture, in conversations and in the ordinary
            moments where people learn to love and serve one another.
          </p>

          <NuxtLink
            to="/announcements"
            class="editorial-link mt-8"
          >
            Explore church life
            <span>→</span>
          </NuxtLink>

        </div>

      </div>

    </section>


    <!-- =====================================================
         STORIES + EVENTS
    ====================================================== -->

    <section class="border-y border-[rgb(var(--line))] bg-[rgb(var(--paper-light))]">

      <div class="container-x">

        <div class="grid lg:grid-cols-2">

          <!-- STORIES -->

          <div class="py-20 lg:border-r lg:border-[rgb(var(--line))] lg:pr-16 lg:py-28">

            <p class="eyebrow text-[rgb(var(--plum))]">
              From Westridge
            </p>

            <h2 class="mt-3 font-display text-5xl leading-none text-[rgb(var(--ink))]">
              Stories
            </h2>

            <div
              v-if="featuredStory"
              class="mt-10"
            >

              <p class="text-xs font-semibold uppercase tracking-[0.16em] text-[rgb(var(--muted))]">
                {{ featuredStory.pinned ? 'Featured' : 'Church life' }}
              </p>

              <h3 class="mt-3 max-w-xl font-display text-4xl leading-tight text-[rgb(var(--ink))]">
                {{ featuredStory.title }}
              </h3>

              <p class="mt-4 max-w-xl text-sm leading-7 text-[rgb(var(--muted))]">
                {{ featuredStory.body }}
              </p>

              <NuxtLink
                to="/announcements"
                class="editorial-link mt-6"
              >
                Read the stories
                <span>→</span>
              </NuxtLink>

            </div>

            <div
              v-if="secondaryStories.length"
              class="mt-10 border-t border-[rgb(var(--line))]"
            >

              <NuxtLink
                v-for="story in secondaryStories"
                :key="story.$id"
                to="/announcements"
                class="group flex items-start justify-between gap-6 border-b border-[rgb(var(--line))] py-5"
              >

                <div>
                  <p class="text-xs uppercase tracking-[0.14em] text-[rgb(var(--muted))]">
                    Church life
                  </p>

                  <h3 class="mt-1 font-display text-2xl text-[rgb(var(--ink))]">
                    {{ story.title }}
                  </h3>
                </div>

                <span class="pt-1 text-lg text-[rgb(var(--muted))] transition group-hover:translate-x-1 group-hover:text-[rgb(var(--plum))]">
                  →
                </span>

              </NuxtLink>

            </div>

          </div>


          <!-- EVENTS -->

          <div class="py-20 lg:pl-16 lg:py-28">

            <p class="eyebrow text-[rgb(var(--plum))]">
              Gather with us
            </p>

            <h2 class="mt-3 font-display text-5xl leading-none text-[rgb(var(--ink))]">
              This week
            </h2>

            <div
              v-if="pending"
              class="mt-10 text-sm text-[rgb(var(--muted))]"
            >
              Loading the church calendar...
            </div>

            <div
              v-else-if="error"
              class="mt-10 text-sm text-[rgb(var(--muted))]"
            >
              We couldn't load the church calendar.
            </div>

            <div
              v-else-if="upcomingEvents.length"
              class="mt-10 border-t border-[rgb(var(--line))]"
            >

              <article
                v-for="event in upcomingEvents"
                :key="event.$id"
                class="grid grid-cols-[72px_1fr] gap-5 border-b border-[rgb(var(--line))] py-6"
              >

                <div>

                  <p class="text-[10px] font-semibold uppercase tracking-[0.14em] text-[rgb(var(--muted))]">
                    {{ new Date(event.startAt).toLocaleDateString('en-ZA', { weekday: 'short' }) }}
                  </p>

                  <p class="mt-1 font-display text-3xl text-[rgb(var(--plum))]">
                    {{ new Date(event.startAt).getDate() }}
                  </p>

                </div>

                <div>

                  <h3 class="font-display text-2xl leading-tight text-[rgb(var(--ink))]">
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
              class="mt-10 border-t border-[rgb(var(--line))] py-6 text-sm text-[rgb(var(--muted))]"
            >
              No upcoming gatherings have been posted yet.
            </div>

            <NuxtLink
              to="/events"
              class="editorial-link mt-7"
            >
              View the calendar
              <span>→</span>
            </NuxtLink>

          </div>

        </div>

      </div>

    </section>


    <!-- =====================================================
         COMMUNITIES
    ====================================================== -->

    <section class="container-x py-24 sm:py-32 lg:py-40">

      <div class="grid gap-12 lg:grid-cols-12">

        <div class="lg:col-span-4">

          <p class="eyebrow text-[rgb(var(--plum))]">
            Our communities
          </p>

          <h2 class="mt-4 font-display text-5xl leading-[0.95] text-[rgb(var(--ink))] sm:text-6xl">
            There is room for you here.
          </h2>

          <p class="mt-6 max-w-sm text-sm leading-7 text-[rgb(var(--muted))]">
            Across generations and stages of life, we gather
            to grow in faith and care for one another.
          </p>

          <NuxtLink
            to="/departments"
            class="editorial-link mt-7"
          >
            Explore every community
            <span>→</span>
          </NuxtLink>

        </div>

        <div class="lg:col-span-7 lg:col-start-6">

          <div class="border-t border-[rgb(var(--line))]">

            <NuxtLink
              v-for="(department, index) in featuredDepartments"
              :key="department.$id"
              :to="
                department.__meta
                  ? `/departments/${department.__meta.slug}`
                  : '/departments'
              "
              class="group grid grid-cols-[50px_1fr_auto] items-center gap-5 border-b border-[rgb(var(--line))] py-6 transition hover:px-3"
            >

              <span class="font-display text-xl text-[rgb(var(--gold))]">
                {{ String(index + 1).padStart(2, '0') }}
              </span>

              <div>

                <h3 class="font-display text-2xl text-[rgb(var(--ink))] sm:text-3xl">
                  {{ department.name }}
                </h3>

                <p class="mt-1 text-sm text-[rgb(var(--muted))]">
                  {{ department.summary || department.__meta?.tagline }}
                </p>

              </div>

              <span class="text-lg text-[rgb(var(--muted))] transition group-hover:translate-x-1 group-hover:text-[rgb(var(--plum))]">
                →
              </span>

            </NuxtLink>

          </div>

        </div>

      </div>

    </section>


    <!-- =====================================================
         SUNDAY / FINAL IMAGE
    ====================================================== -->

    <section class="container-x pb-24 sm:pb-32 lg:pb-40">

      <div class="grid overflow-hidden bg-[rgb(var(--plum))] lg:grid-cols-2">

        <div class="flex flex-col justify-between p-8 text-white sm:p-12 lg:p-16">

          <div>

            <p class="text-xs font-semibold uppercase tracking-[0.2em] text-[rgb(var(--gold))]">
              Every Sunday
            </p>

            <h2 class="mt-5 max-w-xl font-display text-5xl leading-[0.95] sm:text-6xl lg:text-7xl">
              Come as you are.
              <br />
              Worship with us.
            </h2>

            <p class="mt-7 max-w-md text-base leading-7 text-white/70">
              Join us at 09:00 in Mitchells Plain as we gather
              around Scripture, worship and one another.
            </p>

          </div>

          <NuxtLink
            to="/contact"
            class="group mt-12 inline-flex w-fit items-center gap-4 border border-white/30 px-5 py-3 text-sm font-semibold transition hover:border-[rgb(var(--gold))] hover:bg-[rgb(var(--gold))] hover:text-[rgb(var(--plum))]"
          >
            Plan your visit

            <span class="transition-transform group-hover:translate-x-1">
              →
            </span>
          </NuxtLink>

        </div>

        <div class="editorial-image min-h-[420px] lg:min-h-[600px]">

          <img
            src="/sunday-morning.jpg"
            alt="Sunday morning at Westridge Baptist Church"
            class="h-full w-full object-cover"
          />

        </div>

      </div>

    </section>


    <!-- =====================================================
         SCRIPTURE
    ====================================================== -->

    <section class="container-x pb-28 sm:pb-40">

      <div class="mx-auto max-w-4xl text-center">

        <p class="eyebrow text-[rgb(var(--plum))]">
          Scripture
        </p>

        <blockquote class="mt-7 font-display text-4xl leading-tight tracking-[-0.02em] text-[rgb(var(--ink))] sm:text-5xl lg:text-6xl">
          “Let us consider how we may spur one another on toward love and good deeds.”
        </blockquote>

        <p class="mt-7 text-xs font-bold uppercase tracking-[0.2em] text-[rgb(var(--muted))]">
          Hebrews 10:24
        </p>

      </div>

    </section>

  </main>
</template>