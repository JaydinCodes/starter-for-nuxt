<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { Query } from 'appwrite'
import { useAppwrite } from '~/lib/appwrite'
import { getDepartmentMetaBySlug, listDepartmentsMeta } from '~/lib/departments'

const route = useRoute()
const slug = computed(() => route.params.slug as string)
const meta = computed(() => getDepartmentMetaBySlug(slug.value))

if (!meta.value) {
  throw createError({ statusCode: 404, statusMessage: 'Department not found' })
}

useSeoMeta({
  title: `${meta.value.name} | Departments | Westridge Baptist Church`,
  description: meta.value.seoDescription,
})

const config = useRuntimeConfig()
const { databases } = useAppwrite()

const { data, pending, error } = await useAsyncData(
  () => `department-${slug.value}`,
  async () => {
    const res = await databases.listDocuments(
      config.public.appwriteDatabaseId,
      config.public.colDepartments,
      [Query.equal('name', meta.value!.name), Query.limit(1)]
    )
    return res.documents?.[0] ?? null
  }
)

const department = computed(() => data.value)

const heroStyle = computed(() => ({
  background: `radial-gradient(circle at top left, ${meta.value!.heroFrom}, transparent 55%), radial-gradient(circle at top right, ${meta.value!.heroTo}, transparent 55%), linear-gradient(180deg, #f9fafb, #ffffff)`,
}))

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
  <div class="container-x pb-12 pt-6">
    <div class="overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-[0_16px_60px_rgba(15,23,42,0.14)]">
      <div class="border-b border-slate-200/70 px-6 pb-8 pt-8 sm:px-10" :style="heroStyle">
        <div class="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div class="max-w-2xl">
            <Pill :label="meta.shortName" />
            <h1 class="mt-4 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
              {{ meta.name }}
            </h1>
            <p class="mt-2 max-w-xl text-sm leading-relaxed text-slate-600 sm:text-base">
              {{ meta.tagline }}
            </p>

            <div class="mt-4 flex flex-wrap items-center gap-3 text-xs text-slate-600 sm:text-sm">
              <span v-if="meta.ageRange" class="inline-flex items-center gap-1 rounded-full bg-white/60 px-3 py-1 shadow-sm">
                <span class="h-1.5 w-1.5 rounded-full" :style="{ backgroundColor: meta.accentColor }"></span>
                {{ meta.ageRange }}
              </span>

              <span
                v-if="department?.meetingInfo"
                class="inline-flex items-center gap-1 rounded-full bg-white/60 px-3 py-1 shadow-sm"
              >
                <span class="font-medium">When we meet:</span>
                <span>{{ department.meetingInfo }}</span>
              </span>

              <span
                v-if="department?.leaderName"
                class="inline-flex items-center gap-1 rounded-full bg-white/60 px-3 py-1 shadow-sm"
              >
                <span class="font-medium">Leader:</span>
                <span>{{ department.leaderName }}</span>
              </span>
            </div>
          </div>

          <div class="w-full max-w-xs rounded-2xl bg-white/70 p-4 text-xs text-slate-600 shadow-sm backdrop-blur">
            <p class="mb-2 font-semibold text-slate-800">Go to another department</p>
            <label class="sr-only" for="department-select">Choose department</label>
            <select
              id="department-select"
              v-model="selectedSlug"
              class="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm shadow-xs focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-100"
            >
              <option v-for="d in allDepartments" :key="d.slug" :value="d.slug">
                {{ d.name }}
              </option>
            </select>
            <p class="mt-2 text-[11px] leading-relaxed text-slate-500">
              Quickly jump between Children’s Church, Youth, Young Adults, Nehemiah Men, Deborah Ladies, and Sunshine Seniors.
            </p>
          </div>
        </div>
      </div>

      <div class="px-6 py-8 sm:px-10 sm:py-10">
        <div v-if="pending" class="text-sm text-slate-600">
          Loading department details…
        </div>

        <div v-else-if="error">
          <EmptyState
            title="We couldn’t load all the details"
            description="The department information is still being set up. Please check back soon or reach out to us."
            action-label="Contact the church office"
            action-to="/contact"
          />
        </div>

        <div v-else class="grid gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(0,1.4fr)]">
          <section class="space-y-5">
            <h2 class="text-lg font-semibold tracking-tight text-slate-900">What this department is about</h2>
            <p class="text-sm leading-relaxed text-slate-600 sm:text-base">
              {{ department?.summary || meta.seoDescription }}
            </p>

            <ul class="mt-2 space-y-3 text-sm text-slate-700">
              <li
                v-for="point in meta.highlights"
                :key="point"
                class="flex gap-2"
              >
                <span class="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full" :style="{ backgroundColor: meta.accentColor }"></span>
                <span>{{ point }}</span>
              </li>
            </ul>

            <p v-if="meta.scripture" class="mt-4 border-l-2 border-dashed border-slate-200 pl-3 text-xs italic text-slate-500 sm:text-sm">
              {{ meta.scripture }}
            </p>
          </section>

          <aside class="space-y-4 rounded-2xl bg-slate-50 p-5 text-sm text-slate-700">
            <h3 class="text-sm font-semibold uppercase tracking-wide text-slate-500">
              Join {{ meta.shortName }}
            </h3>
            <p>
              If this sounds like a space for you, we’d love to help you connect. Reach out and our team will get back to
              you with the next step.
            </p>

            <div class="space-y-2 text-sm">
              <p v-if="department?.leaderName">
                <span class="font-medium">Contact:</span>
                {{ department.leaderName }}
              </p>
              <p v-if="department?.contactEmail">
                <span class="font-medium">Email:</span>
                <a class="link-brand" :href="`mailto:${department.contactEmail}`">
                  {{ department.contactEmail }}
                </a>
              </p>
            </div>

            <div class="mt-4 flex flex-wrap gap-3">
              <NuxtLink
                to="/contact"
                class="btn-brand inline-flex items-center justify-center gap-1 text-sm"
              >
                Talk to someone
                <span aria-hidden="true">→</span>
              </NuxtLink>

              <NuxtLink
                to="/events"
                class="btn-outline inline-flex items-center justify-center gap-1 text-sm text-slate-900"
              >
                See upcoming events
              </NuxtLink>

              <NuxtLink
                :to="`/announcements?department=${meta.slug}`"
                class="btn-outline inline-flex items-center justify-center gap-1 text-sm text-slate-900"
              >
                View announcements
              </NuxtLink>
            </div>

            <p class="mt-2 text-[11px] leading-relaxed text-slate-500">
              Departments, announcements, and events all work together – explore what’s coming up and what God is doing across church life.
            </p>
          </aside>
        </div>
      </div>
    </div>
  </div>
</template>

