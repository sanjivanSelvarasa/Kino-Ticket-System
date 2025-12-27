<script lang="ts" setup>
import Card from "../components/Home/card.vue"
import SearchBar from "../components/Home/SearchBar.vue";
import Tag from "../components/Home/Tag.vue";
import ShowCard from "../components/Home/ShowCard.vue";
import SoonInCinemaCard from "../components/Home/SoonInCinemaCard.vue";

// const api = import.meta.env.VITE_API_BASE;
//
// const res = await fetch(`${api}/movie`);
// const movies =  await res.json();
// console.log(movies);

</script>

<template>
  <div class="min-h-screen">
    <div class="min-h-screen flex items-center justify-center text-2xl">
      <p>Platzhalter für Animation danach!</p>
    </div>
    <div class="w-[1714px] mx-auto my-4 px-6 py-4 rounded-2xl bg-amber-200">
      <SearchBar></SearchBar>

      <!-- Hero Cards -->
      <section class="w-full flex items-center justify-center gap-4 mb-8">
        <Card v-for="i in 3" :key="i" class="flex-1"></Card>
      </section>

      <!-- Tags Section -->
      <section>
        <div class="flex items-center justify-start gap-3 mb-8 overflow-x-auto">
          <Tag v-for="i in 10" :key="i" svg="fa-solid fa-fire" text="Action" class="flex-shrink-0 w-[155.8px]"></Tag>
        </div>

        <!-- Trending in Animation -->
        <div>
          <h2 style="color: var(--color-primary-text)" class="my-7 w-full font-bold text-2xl">
            Trending in Animation
          </h2>
          <div class="flex items-center justify-start gap-4 overflow-x-auto no-scrollbar pb-4">
            <ShowCard v-for="i in 8" :key="i" class="flex-shrink-0 w-[194.25px]"></ShowCard>
          </div>
        </div>
      </section>

      <!-- Demnächst im Kino -->
      <section class="mt-12">
        <h2 style="color: var(--color-primary-text)" class="my-7 w-full font-bold text-2xl">
          Demnächst im Kino
        </h2>
        <div class="flex items-center justify-start gap-4 overflow-x-auto no-scrollbar pb-4">
          <SoonInCinemaCard v-for="i in 5" :key="i" class="flex-shrink-0 w-[320.4px]"></SoonInCinemaCard>
        </div>
      </section>
    </div>
  </div>
</template>