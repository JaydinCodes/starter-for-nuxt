<script setup lang="ts">
useSeoMeta({
  title: 'Contact | Westridge Baptist Church',
  description: 'Contact Westridge Baptist Church for visits, prayer requests, and general enquiries.',
})
</script>

<template>
  <div class="container-x space-y-10">
    <div>
      <h1 class="section-title">Contact</h1>
      <p class="section-subtitle">We'd love to hear from you.</p>
    </div>

    <section class="grid gap-6 lg:grid-cols-3">
      <div class="lg:col-span-2 space-y-6">
        <InfoCard title="Send us a message" eyebrow="Enquiries">
          <p class="text-slate-500">
            For v1 we'll keep it simple (email/phone). Later we can add a contact form via an Appwrite Function.
          </p>

          <template #footer>
            <div class="flex flex-wrap gap-3">
              <a class="btn-brand" href="mailto:info@yourchurch.org">Email us</a>
              <a class="btn-outline bg-white/60 text-slate-900 hover:bg-white" href="tel:+27XXXXXXXXX">Call</a>
            </div>
          </template>
        </InfoCard>

        <InfoCard title="Visiting" eyebrow="Details">
          Address: Corner of Duin Avenue & Gleneagles Way, Mitchells Plain<br />
          <span class="text-slate-500">Add parking / entrance notes here if helpful.</span>
        </InfoCard>
      </div>

      <div class="space-y-6">
        <InfoCard title="Quick links" eyebrow="Navigation">
          <ul class="space-y-2">
            <li><NuxtLink to="/announcements" class="link-brand">Announcements</NuxtLink></li>
            <li><NuxtLink to="/events" class="link-brand">Events</NuxtLink></li>
            <li><NuxtLink to="/departments" class="link-brand">Departments</NuxtLink></li>
          </ul>
        </InfoCard>

        <InfoCard title="Social" eyebrow="Connect">
          Add Facebook/Instagram/YouTube links when ready.
        </InfoCard>
      </div>
    </section>
  </div>
</template>
