<script lang="ts" setup>
import Hero from "../components/Movie/Hero.vue";
import SoonInCinemaCard from "../components/Home/SoonInCinemaCard.vue";
import {onMounted, ref, watch} from "vue";
import {moviesRepo} from "../api/moviesRepo.ts";
import type {Movie} from "../types/movie.ts";
import TodayShows from "../components/DetailMovie/TodayShows.vue";

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

// test array
const todayShow = ["18:45", "19:00", "20:45"]

</script>

<template>
  <Hero v-if="selectedMovie?.movieid" :id="selectedMovie.movieid" :image="selectedMovie.image" :title="selectedMovie.title" :awards="selectedMovie.awards" :rating="selectedMovie.rating" :releaseDate="selectedMovie.releasedate" :length="selectedMovie.length" :ageRating="selectedMovie.agerating" :genre="selectedMovie.genre" :description="selectedMovie.description"></Hero>

  <div class="pb-15 px-10">
    <h2>Filme die dir gefallen könnten</h2>
    <div class="flex items-center justify-start gap-4 overflow-x-hidden pt-4">
      <SoonInCinemaCard v-if="movies.length > 1" v-for="i in 4" :id="movies[i].movieid" :release="movies[i].releasedate" :title="movies[i].title" class="w-1/4"></SoonInCinemaCard>
    </div>
  </div>
  <div class="px-10 bg-[var(--color-secondary)] py-5 rounded-t-4xl border-b-1 border-b-[var(--color-primary)]">
    <div class="flex items-center justify-between gap-4 overflow-x-hidden">
      <h1 style="color: var(--color-secondary-text) !important; font-size: 35px !important;" class="py-5">Heutige Vorstellungen</h1>
      <div class="flex items-center justify-center gap-2 overflow-x-hidden cursor-pointer text-[var(--color-secondary-text)]">
        <p>Vollständiges Programm</p>
        <i class="fa-solid fa-arrow-right"></i>
      </div>
    </div>
    <div class="flex items-center justify-start gap-4 pb-4 overflow-x-hidden w-full px-1 pt-3 ">
      <TodayShows v-if="movies.length > 1" v-for="i in 4" :id="movies[randIndicies[i]].movieid" :title="movies[randIndicies[i]].title" :image="movies[randIndicies[i]].image" :todayShow="todayShow" class="w-1/4"></TodayShows>
    </div>
  </div>
</template>