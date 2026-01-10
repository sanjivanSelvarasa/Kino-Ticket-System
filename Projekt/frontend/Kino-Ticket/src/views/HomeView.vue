<script lang="ts" setup>
import Card from "../components/Home/card.vue"
import SearchBar from "../components/Home/SearchBar.vue";
import Tag from "../components/Home/Tag.vue";
import ShowCard from "../components/Home/ShowCard.vue";
import SoonInCinemaCard from "../components/Home/SoonInCinemaCard.vue";
import { moviesRepo } from "../api/moviesRepo";
import {computed, onBeforeUnmount, onMounted, ref} from "vue";
import type {Movie} from "../types/movie.ts";
import {useAuthStore} from "../stores/auth.ts";
import { searchMovies } from "../api/tmdb.api.ts";
import Loading from "../components/layout/Loading.vue";

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

// all unique Genres
const uniqueGenre = computed(() =>
    [...new Set(movies.value.map(m => m.genre))]
);

let selectedGenre = ref<string>('Drama');
function selectGenre(genre: string ): void {
  selectedGenre.value = genre;
}

// screen width
const viewPortView = ref(window.innerWidth);

function onResize() {
  viewPortView.value = window.innerWidth;
}

onMounted(() => {
  window.addEventListener("resize", onResize);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", onResize);
});

const showHeroCards = computed(() => Math.floor(viewPortView.value / 544.66));

const showCommingSoonCards = computed(() => Math.floor(viewPortView.value / 320.4));

</script>

<template>
  <div class="overflow-x-hidden">
  <div class="min-h-screen">
    <div class="min-h-screen flex items-center justify-center text-2xl">
      <p>Platzhalter für Animation danach!</p>
    </div>
    <div class="max-w-[1714px] w-full mx-auto my-4 px-6 py-4 rounded-2xl bg-amber-200">
      <SearchBar></SearchBar>

      <!-- Hero Cards -->
      <section class="w-full flex items-center justify-center gap-4 mb-8">
        <Card v-for="i in showHeroCards" v-if="randomIndices.length > 1 && movies.length > randomIndices.length" class="flex-1 min-w-[544.66px] max-w-full" :id="movies[randomIndices[i]].movieid" :image="movies[randomIndices[i]].poster_path" :title="movies[randomIndices[i]].title" :rating="movies[randomIndices[i]].rating" :genre="movies[randomIndices[i]].genre" :release="movies[randomIndices[i]].releasedate" :length="movies[randomIndices[i]].length"></Card>
        <Loading v-if="loading"></Loading>
      </section>

      <!-- Tags Section -->
      <section>
        <div class="flex items-center justify-start gap-3 mb-8 overflow-x-auto no-scrollbar">
          <Tag v-for="(item, i) in uniqueGenre" :key="i" svg="fa-solid fa-fire" :text="item" @select="selectGenre" class="w-[155.8px] whitespace-nowrap"></Tag>
          <Loading v-if="loading"></Loading>
        </div>

        <!-- Trending in ...  -->
        <div>
          <h2>
            Trending in {{ selectedGenre }}
          </h2>
          <div class="flex items-center justify-start gap-4 pb-4 overflow-x-auto overflow-y-visible pt-4 no-scrollbar">
            <ShowCard v-for="(item,i) in movies.filter((movie) => movie.genre === selectedGenre)" :id="item.movieid" :image="item.poster_path" :title="item.title" :rating="item.rating" :release="item.releasedate" :key="i" class="flex-shrink-0 w-[194.25px]"></ShowCard>
          </div>
          <Loading v-if="loading"></Loading>
        </div>
      </section>

      <!-- Demnächst im Kino -->
      <section class="mt-12">
        <h2>
          Demnächst im Kino
        </h2>
        <div class="flex items-center justify-start gap-4 pb-4">
          <SoonInCinemaCard v-if="randomIndices.length > 1 && movies.length > randomIndices.length" v-for="i in showCommingSoonCards" :image="movies[i].poster_path" :id="movies[i].movieid" :title="movies[i].title" :release="movies[i].releasedate" class="min-w-[320.4px] max-w-full flex-1"></SoonInCinemaCard>
          <Loading v-if="loading"></Loading>
        </div>
      </section>
    </div>
  </div>
  </div>
</template>