<script setup lang="ts">
useSeoMeta({
  title: 'About | Westridge Baptist Church',
  description: 'Learn about Westridge Baptist Church—our beliefs, mission, and leadership.',
})
</script>

<template>
  <div class="container-x space-y-10">
    <div>
      <h1 class="section-title">About</h1>
      <p class="section-subtitle">Who we are, what we believe, and how you can get connected.</p>
    </div>

    <section class="grid gap-6 lg:grid-cols-3">
      <div class="lg:col-span-2 space-y-6">
        <InfoCard title="Our mission" eyebrow="Mission">
          We exist to glorify God by proclaiming the gospel, growing disciples, and serving our community with love and truth.
        </InfoCard>

        <InfoCard title="What we believe" eyebrow="Beliefs">
          As a Baptist church, we uphold the authority of Scripture, salvation by grace through faith in Jesus Christ,
          believer’s baptism, and the mission of the local church.
        </InfoCard>

        <InfoCard title="Service times" eyebrow="Visit">
          <ul class="list-disc pl-5">
            <li>Sunday Service: 09:00</li>
            <li>Bible Study: (add schedule)</li>
            <li>Youth: (add schedule)</li>
          </ul>
        </InfoCard>
      </div>

      <div class="space-y-6">
        <InfoCard title="Leadership" eyebrow="Team">
          Add pastor/leadership names here when ready.
        </InfoCard>

        <InfoCard title="Location" eyebrow="Where">
          Westridge Baptist Church<br />
          <span class="text-slate-500">Corner of Duin Avenue & Gleneagles Way, Mitchells Plain</span>

          <template #footer>
            <NuxtLink to="/contact" class="link-brand text-sm">Get directions →</NuxtLink>
          </template>
        </InfoCard>
      </div>
    </section>
  </div>
</template>
