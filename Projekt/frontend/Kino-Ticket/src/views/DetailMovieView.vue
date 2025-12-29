<script lang="ts" setup>
import Hero from "../components/Movie/Hero.vue";
import SoonInCinemaCard from "../components/Home/SoonInCinemaCard.vue";
import {onMounted, ref} from "vue";
import {moviesRepo} from "../api/moviesRepo.ts";
import type {Movie} from "../types/movie.ts";
import TodayShows from "../components/DetailMovie/TodayShows.vue";

const props = defineProps<{
  image: string | null,
  title: string,
  awards: string,
  rating: string,
  releaseDate: Date,
  length: number,
  ageRating: number,
  genre: string,
  description: string,
}>()

const movies = ref<Movie[]>([]);
const loading = ref<boolean>(false);

onMounted( async () => {
  try{
    movies.value = (await moviesRepo.getAllMovies()).filter((movie) => movie.genre === props.genre)
  }
  catch(e: any){
    e.value = e.error ?? "Fehler beim Laden";
  }
  finally{
    loading.value = false;
  }
})

</script>

<template>
  <Hero :image="props.image" :title="props.title" :awards="props.awards" :rating="props.rating" :releaseDate="props.releaseDate" :length="props.length" :ageRating="props.ageRating" :genre="props.genre" :description="props.description"></Hero>

  <div>
    <h2>Filme die dir gefallen könnten</h2>
    <div class="flex items-center justify-start gap-4 pb-4 overflow-x-hidden">
      <SoonInCinemaCard v-for="i in [0,1,2]" :release="movies[i].releasedate" :title="movies[i].title"></SoonInCinemaCard>
    </div>
  </div>
  <div>
    <h2>Heutige Vorstellungen</h2>
    <div class="flex items-center justify-start gap-4 pb-4 overflow-x-hidden">
      <TodayShows v-for="i in 3" title="" image="null" todayShow=""></TodayShows>
    </div>
  </div>
</template>