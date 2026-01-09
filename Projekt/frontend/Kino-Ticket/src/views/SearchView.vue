<script lang="ts" setup>
import ShowCard from "../components/Home/ShowCard.vue";
import {onMounted, ref, watch} from "vue";
import type {Movie} from "../types/movie.ts";
import {moviesRepo} from "../api/moviesRepo.ts";

const searchText = ref("");

const movies = ref<Movie[]>([]);
const searchedMovies = ref<Movie[]>([]);
const loading = ref<boolean>(true);
const error = ref<Error | null>(null);

onMounted( async () => {
  try{
    movies.value = await moviesRepo.getAllMovies();
  }catch(e: any){
    error.value = e ?? 'Movies not found';
  }finally {
    loading.value = false;
  }
})

function searchMovies(text: string) {
  text = text.trim().toLowerCase();
  if (text.length > 0 && !loading.value) {
    searchedMovies.value = movies.value.filter(movie => movie.title.includes(text));
  }
}

watch(searchText, (newVal, oldVal) => {
  newVal = newVal.trim().toLowerCase();
  if (newVal.length > 0 && !loading.value) {
    searchedMovies.value = movies.value.filter(movie => movie.title.toLowerCase().includes(newVal));
  }
})
</script>

<template>
  <div class="overflow-x-hidden">
    <nav class="w-screen h-fit mt-25 bg-[var(--color-primary)] mb-8 flex justify-center">
      <div class="border-3 rounded-full gap-2 flex justify-start items-center w-120 px-4 py-2 border-[var(--color-secondary)] text-[var(--color-primary-text)]">
        <div>
          <i class="fa-solid fa-magnifying-glass"></i>
        </div>
        <input v-model="searchText" type="search" name="search" id="search" placeholder="Suchen ..." class="w-full h-fit outline-0"/>
      </div>
    </nav>
    <section class="h-screen mx-3">
      <div v-if="!loading " class="flex gap-2 flex-wrap h-fit w-full overflow-y-auto pt-3">
        <ShowCard v-for="i in searchedMovies" :id="i.movieid.toString()" :title="i.title" :rating="i.rating" :release="i.releasedate" :image="i.poster_path" class="w-50"></ShowCard>
      </div>
      <div v-if="!loading && searchedMovies.length === 0 " class="flex gap-2 flex-wrap h-fit w-full overflow-y-auto pt-3">
        <ShowCard v-for="i in movies" :id="i.movieid.toString()" :title="i.title" :rating="i.rating" :release="i.releasedate" :image="i.poster_path" class="w-50"></ShowCard>
      </div>
      <div v-if="loading && searchedMovies.length === 0">
        <div>
          <i class="fa-solid fa-magnifying-glass"></i>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>

</style>