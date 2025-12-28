<script lang="ts" setup>
import Card from "../components/Home/card.vue"
import SearchBar from "../components/Home/SearchBar.vue";
import Tag from "../components/Home/Tag.vue";
import ShowCard from "../components/Home/ShowCard.vue";
import SoonInCinemaCard from "../components/Home/SoonInCinemaCard.vue";
import { moviesRepo } from "../api/moviesRepo";
import {computed, onMounted, ref} from "vue";
import type {Movie} from "../types/movie.ts";

const movies = ref<Movie[]>([]);
const error = ref<string | null>(null);
const loading = ref(true);

const randomIndices = ref<number[]>([]);

onMounted(async () => {
  try {
    movies.value = await moviesRepo.getAllMovies();
    randomIndices.value = getRandomIndices(movies.value.length - 1, movies.value.length);
  } catch (e: any) {
    error.value = e.message ?? "Fehler beim Laden";
  } finally {
    loading.value = false;
  }
});

// Random Number Gen
function getRandomIndices(count: number, max: number): number[] {
  const indices = new Set<number>();
  while (indices.size < count && indices.size < max) {
    indices.add(Math.floor(Math.random() * max));
  }
  return [...indices];
}
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
        <Card v-for="i in [0,1,2]" v-if="randomIndices.length > 1 && movies.length > randomIndices.length" class="flex-1 w-[544.66px]" :title="movies[randomIndices[i]].title" :rating="movies[randomIndices[i]].rating" :genre="movies[randomIndices[i]].genre" :release="movies[randomIndices[i]].releasedate" :length="movies[randomIndices[i]].length"></Card>
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
          <div class="flex items-center justify-start gap-4 pb-4">
            <ShowCard v-if="randomIndices.length > 1 && movies.length > randomIndices.length" v-for="i in [3,4,5,6,7,8,9,10]" :title="movies[randomIndices[i]].title" :rating="movies[randomIndices[i]].rating" :release="movies[randomIndices[i]].releasedate" :key="i" class="flex-shrink-0 w-[194.25px]"></ShowCard>
          </div>
        </div>
      </section>

      <!-- Demnächst im Kino -->
      <section class="mt-12">
        <h2 style="color: var(--color-primary-text)" class="my-7 w-full font-bold text-2xl">
          Demnächst im Kino
        </h2>
        <div class="flex items-center justify-start gap-4 pb-4">
          <SoonInCinemaCard v-if="randomIndices.length > 1 && movies.length > randomIndices.length" v-for="i in [11,12,13,14,15]" :key="i" :title="movies[i].title" :release="movies[i].releasedate" class="flex-shrink-0 w-[320.4px]"></SoonInCinemaCard>
        </div>
      </section>
    </div>
  </div>
</template>