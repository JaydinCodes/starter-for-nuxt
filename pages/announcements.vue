<script setup lang="ts">
import { computed } from 'vue'
import { Query } from 'appwrite'

import { useAppwrite } from '~/lib/appwrite'

useSeoMeta({
  title: 'Stories | Westridge Baptist Church',
  description:
    'Stories, updates and news from life at Westridge Baptist Church.',
})

const config = useRuntimeConfig()
const { databases } = useAppwrite()

const { data, pending, error } = await useAsyncData(
  'announcements',
  async () => {
    const res = await databases.listDocuments(
      config.public.appwriteDatabaseId,
      config.public.colAnnouncements,
      [
        Query.equal('published', true),
        Query.orderDesc('$createdAt'),
        Query.limit(50),
      ],
    )

    return res.documents
  },
)

const featured = computed(() => {
  if (!data.value?.length) return null

  return data.value.find((a: any) => a.pinned) ?? data.value[0]
})

const rest = computed(() =>
  (data.value ?? []).filter(
    (a: any) => a.$id !== featured.value?.$id,
  ),
)

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString('en-ZA', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
</script>

<template>
  <div>

    <!-- HEADER -->
    <section class="container-x pt-12 sm:pt-16 lg:pt-20">
      <p class="eyebrow">
        The life of the church
      </p>

      <h1 class="editorial-heading mt-4">
        Stories from Westridge.
      </h1>

      <p class="mt-7 max-w-2xl text-lg leading-relaxed text-[rgb(var(--muted))]">
        News, reflections and moments from the life of our church community.
      </p>
    </section>

    <!-- CONTENT -->
    <section class="container-x py-20 sm:py-28">

      <div
        v-if="pending"
        class="text-sm text-[rgb(var(--muted))]"
      >
        Loading stories...
      </div>

      <EmptyState
        v-else-if="error"
        title="Couldn't load stories"
        description="Check Appwrite permissions and collection IDs."
        action-label="Go home"
        action-to="/"
      />

      <EmptyState
        v-else-if="!data?.length"
        title="No stories yet"
        description="Church stories and updates will appear here."
        action-label="Go home"
        action-to="/"
      />

      <template v-else>

        <!-- FEATURED -->
        <article class="grid gap-10 lg:grid-cols-12">

          <div class="lg:col-span-7">
            <div class="editorial-image aspect-[4/3] bg-slate-200">
              <img
                src="/hero.jpg"
                :alt="featured.title"
              />
            </div>
          </div>

          <div class="flex flex-col justify-center lg:col-span-5 lg:pl-8">

            <p class="eyebrow">
              {{ featured.pinned ? 'Featured story' : 'Latest story' }}
            </p>

            <h2 class="mt-4 font-display text-4xl leading-tight sm:text-5xl">
              {{ featured.title }}
            </h2>

            <p class="mt-3 text-sm text-[rgb(var(--muted))]">
              {{ formatDate(featured.$createdAt) }}
            </p>

            <p class="mt-6 leading-relaxed text-[rgb(var(--muted))]">
              {{ featured.body }}
            </p>

            <div class="mt-8 h-px w-16 bg-[rgb(var(--gold))]" />
          </div>
        </article>

        <!-- STORIES -->
        <div
          v-if="rest.length"
          class="mt-20 border-t border-[rgb(var(--line))]"
        >

          <article
            v-for="story in rest"
            :key="story.$id"
            class="grid gap-5 border-b border-[rgb(var(--line))] py-8 lg:grid-cols-[180px_1fr_180px]"
          >

            <p class="eyebrow self-start">
              Church life
            </p>

            <div>
              <h3 class="font-display text-3xl leading-tight">
                {{ story.title }}
              </h3>

              <p class="mt-3 line-clamp-3 text-sm leading-relaxed text-[rgb(var(--muted))]">
                {{ story.body }}
              </p>
            </div>

            <p class="text-sm text-[rgb(var(--muted))] lg:text-right">
              {{ formatDate(story.$createdAt) }}
            </p>

          </article>

        </div>

      </template>
    </section>

  </div>
</template>