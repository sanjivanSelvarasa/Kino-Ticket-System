<script lang="ts" setup>
import Hero from "../components/Movie/Hero.vue";
import SoonInCinemaCard from "../components/Home/SoonInCinemaCard.vue";
import {computed, onBeforeUnmount, onMounted, ref, watch} from "vue";
import {moviesRepo} from "../api/moviesRepo.ts";
import type {Movie} from "../types/movie.ts";
import TodayShows from "../components/DetailMovie/TodayShows.vue";
import Loading from "../components/layout/Loading.vue";

const props = defineProps<{
  id: number
}>()

const selectedMovie = ref<Movie>();
const movies = ref<Movie[]>([]);
const moviesGenre = ref<Movie[]>([]);
const loading = ref<boolean>(true);

const randIndicies = ref<number[]>([]);

onMounted( async () => {
  try{
    selectedMovie.value = await moviesRepo.getById(props.id);
    movies.value = (await moviesRepo.getAllMovies())
    moviesGenre.value = moviesGenre.value.filter((movie) => movie.genre === selectedMovie.value?.genre)
    randIndicies.value = getRandomIndices(movies.value.length - 1, movies.value.length);
  }
  catch(e: any){
    e.value = e.error ?? "Fehler beim Laden";
  }
  finally{
    loading.value = false;
  }
})

async function getMovie(id: number){
  loading.value = true;
  selectedMovie.value = await moviesRepo.getById(id)
  loading.value = false;
}

watch(
    () => props.id,
    (id) => getMovie(id),
    {immediate: true}
)

// Random Number Gen
function getRandomIndices(count: number, max: number): number[] {
  const indices = new Set<number>();
  while (indices.size < count && indices.size < max) {
    indices.add(Math.floor(Math.random() * max));
  }
  return [...indices];
}

// card visible
const container = ref<HTMLElement | null>(null);
const cardWidth = 420;
const visibleCount = ref(0);

function updateCount() {
  if (!container.value) return;
  visibleCount.value = Math.floor(container.value.clientWidth / cardWidth);
}

onMounted(() => {
  updateCount();
  window.addEventListener("resize", updateCount);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", updateCount);
});

const visibleMovies = computed(() =>
    movies.value.slice(0, visibleCount.value)
);

const visibleMovies2 = computed(() =>
    movies.value.slice(5, visibleCount.value + 5)
);
</script>

<template>
    <Hero v-if="selectedMovie?.movieid && !loading" :id="selectedMovie.movieid" :trailer="selectedMovie.trailer" :programTimes="selectedMovie.programtime" :image="selectedMovie.poster_path" :title="selectedMovie.title" :awards="selectedMovie.awards" :rating="selectedMovie.rating" :releaseDate="selectedMovie.releasedate" :length="selectedMovie.length" :ageRating="selectedMovie.agerating" :genre="selectedMovie.genre" :description="selectedMovie.description"></Hero>
    <Loading v-if="loading"></Loading>
  <div class="pb-15 px-10">
    <h2>Filme die dir gefallen könnten</h2>
    <div ref="container" class="grid gap-4 pt-4 overflow-hidden grid-flow-col auto-cols-[minmax(420px,1fr)]">
      <SoonInCinemaCard v-if="movies.length > 1" v-for="movie in visibleMovies" :id="movie.movieid" :image="movie.poster_path" :release="movie.releasedate" :title="movie.title" class="min-w-[320px]"></SoonInCinemaCard>
      <Loading v-if="loading"></Loading>
    </div>
  </div>
  <div class="px-10 bg-[var(--color-secondary)] py-5 rounded-t-4xl border-b-1 border-b-[var(--color-primary)]">
    <div class="flex items-center justify-between gap-4 overflow-x-hidden">
      <h1 style="color: var(--color-secondary-text) !important; font-size: 35px !important;" class="py-5">Heutige Vorstellungen</h1>
      <RouterLink to="/movie" class="flex items-center justify-center gap-2 overflow-x-hidden cursor-pointer text-[var(--color-secondary-text)] max-md:hidden hover:translate-x-[-5px] transition-all duration-200">
        <p>Vollständiges Programm</p>
        <i class="fa-solid fa-arrow-right"></i>
      </RouterLink>
    </div>
    <div class="grid gap-4 pb-4 overflow-x-hidden grid-flow-col auto-cols-[minmax(420px, 1fr)] w-full px-1 pt-3 ">
      <TodayShows v-if="movies.length > 1" v-for="movie in visibleMovies2" :id="movie.movieid" :title="movie.title" :image="movie.poster_path" :programtime="movie.programtime" class="min-w-[320px]"></TodayShows>
      <Loading v-if="loading"></Loading>
    </div>
  </div>
</template>