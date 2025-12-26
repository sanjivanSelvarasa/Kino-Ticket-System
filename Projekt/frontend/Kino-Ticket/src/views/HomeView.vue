<script lang="ts" setup>
import Card from "../components/Home/card.vue"
import SearchBar from "../components/Home/SearchBar.vue";
import Tag from "../components/Home/Tag.vue";
import ShowCard from "../components/Home/ShowCard.vue";
import SoonInCinemaCard from "../components/Home/SoonInCinemaCard.vue";
</script>

<template>
  <div class="min-h-screen">
    <div class="min-h-screen flex items-center justify-center text-2xl">
      <p>Platzhalter für Animation danach!</p>
    </div>
    <div class="w-full max-w-fit mx-auto my-4 px-6 py-4 rounded-2xl bg-amber-200">
      <SearchBar></SearchBar>

      <!-- Hero Cards -->
      <section class="w-full flex items-center justify-center gap-4 mb-8">
        <Card v-for="i in 2" :key="i" class="flex-1 max-w-[620px]"></Card>
      </section>

      <!-- Tags Section -->
      <section>
        <div class="flex items-center justify-center gap-3 mb-8 overflow-x-auto">
          <Tag v-for="i in 8" :key="i" svg="fa-solid fa-fire" text="Action" class="flex-shrink-0"></Tag>
        </div>

        <!-- Trending in Animation -->
        <div>
          <h2 style="color: var(--color-primary-text)" class="my-7 w-full font-bold text-2xl">
            Trending in Animation
          </h2>
          <div class="flex items-center justify-start gap-4 overflow-x-auto pb-4">
            <ShowCard v-for="i in 7" :key="i" class="flex-shrink-0 w-[180px]"></ShowCard>
          </div>
        </div>
      </section>

      <!-- Demnächst im Kino -->
      <section class="mt-12">
        <h2 style="color: var(--color-primary-text)" class="my-7 w-full font-bold text-2xl">
          Demnächst im Kino
        </h2>
        <div class="flex items-center justify-start gap-4 overflow-x-auto pb-4">
          <SoonInCinemaCard v-for="i in 4" :key="i" class="flex-shrink-0 w-[300px]"></SoonInCinemaCard>
        </div>
      </section>
    </div>
  </div>
</template>