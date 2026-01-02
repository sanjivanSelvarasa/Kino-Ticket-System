<script lang="ts" setup>
import ShowCase from "../components/Movie/ShowCase.vue";
import type {Movie} from "../types/movie.ts";
import {computed, onMounted, ref} from "vue";
import {moviesRepo} from "../api/moviesRepo.ts";
import Hero from "../components/Movie/Hero.vue";

const movies = ref<Movie[]>([]);
const loading = ref(true);

const randomIndices = ref<number[]>([]);

onMounted( async () => {
  try{
    movies.value = await moviesRepo.getAllMovies()
    randomIndices.value = getRandomIndices(movies.value.length, movies.value.length - 1)
  }
  catch(error: any){
    error.value = error.message ?? "Fehler beim Laden";
  }
  finally{
    loading.value = false;
  }
})

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

// Left & Right Scroll
const step = 960;
const rowRef = ref<HTMLElement[]>([]);
const canScrollLeft = ref<boolean[]>([]);
const canScrollRight = ref<boolean[]>([]);

function setRowRef(ref: HTMLElement | null, idx: number): void {
  if(!ref) return;

  rowRef.value[idx] = ref;

  // initial prüfen
  updateScrollState(idx);

  // bei Scroll aktualisieren
  ref.addEventListener("scroll", () => updateScrollState(idx));
}

function updateScrollState(idx: number) {
  const el = rowRef.value[idx];
  if (!el) return;

  canScrollLeft.value[idx] = el.scrollLeft > 0;
  canScrollRight.value[idx] =
      el.scrollLeft + el.clientWidth < el.scrollWidth;
}

function scrollLeft(index: number){
  rowRef.value[index]?.scrollBy({left: -step, behavior: "smooth"});
}

function scrollRight(index: number){
  rowRef.value[index]?.scrollBy({left: step, behavior: "smooth"});
}

</script>

<template>
  <Hero v-if="randomIndices.length > 1" :id="movies[randomIndices[0]].movieid" :image="movies[randomIndices[0]].poster_path" :title="movies[randomIndices[0]].title" :awards="movies[randomIndices[0]].awards" :rating="movies[randomIndices[0]].rating" :releaseDate="movies[randomIndices[0]].releasedate" :length="movies[randomIndices[0]].length" :ageRating="movies[randomIndices[0]].agerating" :genre="movies[randomIndices[0]].genre" :description="movies[randomIndices[0]].description"></Hero>

  <main class="px-10">
    <div v-for="i in uniqueGenre.length" class="relative">
      <button v-if="canScrollLeft[i]" @click="scrollLeft(i)" class="cursor-pointer absolute left-2 top-[50%] translate-y-[-50%] border-4 border-[var(--color-primary)] w-[55px] h-[55px] rounded-full bg-[var(--color-secondary)] z-5 hover:bg-[var(--color-primary)] hover:border-[var(--color-secondary)] hover:text-[var(--color-primary-text)] transition-all duration-300"><i class="fa-solid fa-arrow-left"></i></button>
      <section class="mb-15">
        <h2 style="color: var(--color-primary-text)" class="font-bold text-2xl mb-5">{{uniqueGenre[i]}}</h2>
        <div :ref="el => setRowRef(el as HTMLElement | null, i)" class="flex items-center justify-start gap-4 w-full overflow-auto no-scrollbar pt-4">
          <ShowCase v-for="item in movies.filter((movie) => movie.genre === uniqueGenre[i])" :key="item.movieid" :id="item.movieid" :title="item.title" :image="item.poster_path" :rating="item.rating" :genre="item.genre" :length="item.length"></ShowCase>
        </div>
      </section>
      <button v-if="canScrollRight[i]" @click="scrollRight(i)" class="cursor-pointer absolute right-2 top-[50%] translate-y-[-50%] border-4 border-[var(--color-primary)] w-[55px] h-[55px] rounded-full bg-[var(--color-secondary)] hover:bg-[var(--color-primary)] hover:border-[var(--color-secondary)] hover:text-[var(--color-primary-text)] transition-all duration-300"><i class="fa-solid fa-arrow-right"></i></button>
    </div>
  </main>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Huninn&family=Roboto:ital,wght@0,100..900;1,100..900&display=swap');

</style>