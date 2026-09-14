<script setup lang="ts">
useSeoMeta({
  title: 'About | Westridge Baptist Church',
  description:
    'Learn about Westridge Baptist Church, our beliefs, mission, leadership, and life together.',
})
</script>

<template>
  <div>

    <!-- HERO -->
    <section class="container-x pt-12 sm:pt-16 lg:pt-20">
      <div class="max-w-5xl">
        <p class="eyebrow">
          The Church
        </p>

        <h1 class="editorial-heading mt-4">
          A church gathered
          <br />
          around Christ.
        </h1>

        <p class="mt-8 max-w-2xl text-lg leading-relaxed text-[rgb(var(--muted))]">
          Westridge Baptist Church is a community of people seeking to follow
          Jesus together through worship, Scripture, prayer, fellowship and service.
        </p>
      </div>
    </section>

    <!-- INTRO -->
    <section class="container-x py-24 sm:py-32">
      <div class="grid gap-12 lg:grid-cols-12">

        <div class="lg:col-span-4">
          <p class="eyebrow">
            Who we are
          </p>
        </div>

        <div class="lg:col-span-7 lg:col-start-6">
          <h2 class="editorial-heading-sm">
            Church is a people, not simply a place.
          </h2>

          <p class="mt-7 text-lg leading-relaxed text-[rgb(var(--muted))]">
            We gather as a local Baptist church in Mitchells Plain to worship
            God, hear His Word, encourage one another and serve the community
            around us.
          </p>

          <p class="mt-5 text-lg leading-relaxed text-[rgb(var(--muted))]">
            Our hope is that everyone who walks through our doors would find
            a community where they can grow in faith and share life with others.
          </p>
        </div>
      </div>
    </section>

    <!-- MISSION -->
    <section class="bg-[rgb(var(--forest))] py-24 text-white sm:py-32">
      <div class="container-x grid gap-12 lg:grid-cols-12">

        <div class="lg:col-span-4">
          <p class="eyebrow text-white/60">
            Our mission
          </p>
        </div>

        <div class="lg:col-span-7 lg:col-start-6">
          <h2 class="font-display text-5xl leading-tight sm:text-6xl">
            To glorify God by proclaiming the gospel, growing disciples, and
            serving our community with love and truth.
          </h2>
        </div>

      </div>
    </section>

    <!-- BELIEFS -->
    <section class="container-x py-24 sm:py-32">
      <div class="grid gap-12 lg:grid-cols-12">

        <div class="lg:col-span-4">
          <p class="eyebrow">
            What we believe
          </p>

          <p class="mt-5 max-w-sm text-sm leading-relaxed text-[rgb(var(--muted))]">
            Our faith is rooted in Scripture and centred on the person and work
            of Jesus Christ.
          </p>
        </div>

        <div class="lg:col-span-7 lg:col-start-6">

          <div class="border-t border-[rgb(var(--line))]">

            <div class="border-b border-[rgb(var(--line))] py-7">
              <p class="font-display text-3xl">
                Scripture
              </p>

              <p class="mt-3 leading-relaxed text-[rgb(var(--muted))]">
                We believe the Bible is the authoritative Word of God and the
                foundation for our faith and life.
              </p>
            </div>

            <div class="border-b border-[rgb(var(--line))] py-7">
              <p class="font-display text-3xl">
                Salvation
              </p>

              <p class="mt-3 leading-relaxed text-[rgb(var(--muted))]">
                We believe salvation is by God's grace through faith in Jesus
                Christ.
              </p>
            </div>

            <div class="border-b border-[rgb(var(--line))] py-7">
              <p class="font-display text-3xl">
                Baptism
              </p>

              <p class="mt-3 leading-relaxed text-[rgb(var(--muted))]">
                We practise believer's baptism as a public expression of faith
                in Christ.
              </p>
            </div>

            <div class="border-b border-[rgb(var(--line))] py-7">
              <p class="font-display text-3xl">
                The local church
              </p>

              <p class="mt-3 leading-relaxed text-[rgb(var(--muted))]">
                We believe God calls His people to worship, serve, encourage
                and grow together as a local church community.
              </p>
            </div>

          </div>
        </div>
      </div>
    </section>

    <!-- SERVICE -->
    <section class="bg-[rgb(var(--paper-light))] py-24 sm:py-32">
      <div class="container-x">

        <div class="max-w-2xl">
          <p class="eyebrow">
            Come and worship
          </p>

          <h2 class="editorial-heading-sm mt-3">
            Join us on Sunday.
          </h2>
        </div>

        <div class="mt-12 grid border-t border-[rgb(var(--line))] sm:grid-cols-3">

          <div class="border-b border-[rgb(var(--line))] py-7 sm:border-r sm:pr-8">
            <p class="text-xs font-semibold uppercase tracking-[0.16em] text-[rgb(var(--muted))]">
              Sunday
            </p>

            <p class="mt-2 font-display text-3xl">
              Morning Worship
            </p>

            <p class="mt-2 text-sm text-[rgb(var(--muted))]">
              09:00
            </p>
          </div>

          <div class="border-b border-[rgb(var(--line))] py-7 sm:px-8">
            <p class="text-xs font-semibold uppercase tracking-[0.16em] text-[rgb(var(--muted))]">
              Location
            </p>

            <p class="mt-2 font-display text-3xl">
              Mitchells Plain
            </p>

            <p class="mt-2 text-sm text-[rgb(var(--muted))]">
              Cape Town
            </p>
          </div>

          <div class="py-7 sm:border-l sm:border-[rgb(var(--line))] sm:pl-8">
            <p class="text-xs font-semibold uppercase tracking-[0.16em] text-[rgb(var(--muted))]">
              Everyone
            </p>

            <p class="mt-2 font-display text-3xl">
              Is welcome
            </p>

            <NuxtLink
              to="/contact"
              class="editorial-link mt-3"
            >
              Plan your visit →
            </NuxtLink>
          </div>

        </div>
      </div>
    </section>

    <!-- LEADERSHIP -->
    <section class="container-x py-24 sm:py-32">
      <div class="grid gap-12 lg:grid-cols-12">

        <div class="lg:col-span-4">
          <p class="eyebrow">
            Leadership
          </p>

          <h2 class="editorial-heading-sm mt-3">
            Serving the church.
          </h2>
        </div>

        <div class="lg:col-span-7 lg:col-start-6">
          <p class="text-lg leading-relaxed text-[rgb(var(--muted))]">
            Our leadership team exists to serve the church, teach God's Word,
            care for people and help the whole church grow in faith.
          </p>

          <div class="mt-8 border-t border-[rgb(var(--line))] pt-6">
            <p class="font-display text-3xl">
              Leadership information coming soon.
            </p>

            <p class="mt-2 text-sm text-[rgb(var(--muted))]">
              Pastor and leadership profiles can be added here when ready.
            </p>
          </div>
        </div>

      </div>
    </section>

    <!-- LOCATION -->
    <section class="border-t border-[rgb(var(--line))]">
      <div class="container-x grid lg:grid-cols-2">

        <div class="py-20 lg:pr-16 lg:py-28">
          <p class="eyebrow">
            Find us
          </p>

          <h2 class="editorial-heading-sm mt-3">
            Westridge Baptist Church
          </h2>

          <p class="mt-6 text-lg leading-relaxed text-[rgb(var(--muted))]">
            Corner of Duin Avenue & Gleneagles Way,
            Mitchells Plain, Cape Town.
          </p>

          <NuxtLink
            to="/contact"
            class="editorial-link mt-7"
          >
            Get directions →
          </NuxtLink>
        </div>

        <div class="min-h-[350px] bg-[rgb(var(--forest))]" />

      </div>
    </section>

  </div>
</template>