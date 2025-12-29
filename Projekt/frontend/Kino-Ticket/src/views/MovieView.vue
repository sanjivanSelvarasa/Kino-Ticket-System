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
const step = 320;
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
<!--  <header  v-if="randomIndices.length > 1" style="font-family: 'Bebas Neue', sans-serif;" class="flex items-center justify-start px-10 min-h-screen tracking-wider">-->
<!--    <div class="w-fit max-w-[550px] ">-->
<!--      <div style="background-color: var(&#45;&#45;color-secondary); color: var(&#45;&#45;color-secondary-text)" class="flex items-center justify-start gap-2 overflow-x-auto px-4 py-2 mb-5 text-sm rounded-sm w-fit font-bold">-->
<!--        <i class="fa-solid fa-award"></i>-->
<!--        <span class="">{{movies[randomIndices[0]].awards}}</span>-->
<!--      </div>-->

<!--      <h1 style="color: var(&#45;&#45;color-primary-text); text-shadow: rgba(255, 255, 255, 0.3) 4px 4px 0px; " class="text-7xl font-extrabold tracking-wide mb-5">{{movies[randomIndices[0]].title}}</h1>-->

<!--      <div class="flex items-center justify-start gap-4 w-full text-base">-->
<!--        <div style="background-color: var(&#45;&#45;color-secondary); color: var(&#45;&#45;color-secondary-text)" class="flex items-center justify-center gap-1 rounded-sm px-2 py-1">-->
<!--          <i class="fa-solid fa-star"></i>-->
<!--          <span class="font-extrabold">{{movies[randomIndices[0]].rating}}</span>-->
<!--        </div>-->

<!--        <span class="px-2 py-1">{{ movies[randomIndices[0]].releasedate.getFullYear() }}</span>-->

<!--        <span class="px-2 py-1">{{movies[randomIndices[0]].length}} Min</span>-->

<!--        <span style="border-color: var(&#45;&#45;color-normal-text)" class="rounded-sm border-2 px-2 py-1">FSK {{movies[randomIndices[0]].agerating}}</span>-->

<!--        <span style="background-color: rgba(26, 15, 10, 0.1)" class="rounded-full py-1 px-4">{{movies[randomIndices[0]].genre}}</span>-->
<!--      </div>-->

<!--      <p class="my-4 w-full">{{movies[randomIndices[0]].description}}</p>-->

<!--      <div class="flex items-center justify-start gap-4 w-full">-->
<!--          <div style="background-color: var(&#45;&#45;color-secondary); color: var(&#45;&#45;color-secondary-text)" class="cursor-pointer font-bold flex gap-2 py-4 px-6 rounded-md">-->
<!--            <i class="fa-solid fa-play"></i>-->
<!--            <span>Tickets buchen</span>-->
<!--          </div>-->

<!--          <div style="background-color: var(&#45;&#45;color-normal-text); color: var(&#45;&#45;color-primary-text)" class="cursor-pointer font-bold flex gap-2 py-4 px-6 rounded-md">-->
<!--            <i class="fa-solid fa-info"></i>-->
<!--            <span>Mehr Infos</span>-->
<!--          </div>-->
<!--      </div>-->

<!--      <div class="mt-6 w-full ">-->
<!--        <span class="block mb-2">Heute im Program</span>-->
<!--        <div class="flex items-center justify-start gap-4 w-full">-->
<!--          <span style="background-color: rgba(26, 15, 10, 0.1)" class="py-2 px-4 rounded-md">10:45</span>-->
<!--          <span style="background-color: rgba(26, 15, 10, 0.1)" class="py-2 px-4 rounded-md">13:40</span>-->
<!--          <span style="background-color: rgba(26, 15, 10, 0.1)" class="py-2 px-4 rounded-md">18:15</span>-->
<!--        </div>-->
<!--      </div>-->
<!--    </div>-->
<!--  </header>-->

  <Hero v-if="randomIndices.length > 1" :image="movies[randomIndices[0]].image" :title="movies[randomIndices[0]].title" :awards="movies[randomIndices[0]].awards" :rating="movies[randomIndices[0]].rating" :releaseDate="movies[randomIndices[0]].releasedate" :length="movies[randomIndices[0]].length" :ageRating="movies[randomIndices[0]].agerating" :genre="movies[randomIndices[0]].genre" :description="movies[randomIndices[0]].description"></Hero>

  <main class="px-10">
    <div v-for="i in uniqueGenre.length" class="relative">
      <button v-if="canScrollLeft[i]" @click="scrollLeft(i)" class="cursor-pointer absolute left-2 top-[50%] translate-y-[-50%] border-4 border-[var(--color-primary)] w-[55px] h-[55px] rounded-full bg-[var(--color-secondary)] hover:bg-[var(--color-primary)] hover:border-[var(--color-secondary)] hover:text-[var(--color-primary-text)] transition-all duration-300"><i class="fa-solid fa-arrow-left"></i></button>
      <section class="mb-15">
        <h2 style="color: var(--color-primary-text)" class="font-bold text-2xl mb-5">{{uniqueGenre[i]}}</h2>
        <div :ref="el => setRowRef(el as HTMLElement | null, i)" class="flex items-center justify-start gap-4 w-full overflow-auto no-scrollbar">
          <ShowCase v-for="item in movies.filter((movie) => movie.genre === uniqueGenre[i])" :title="item.title" :image="item.image" :rating="item.rating" :genre="item.genre" :length="item.length"></ShowCase>
        </div>
      </section>
      <button v-if="canScrollRight[i]" @click="scrollRight(i)" class="cursor-pointer absolute right-2 top-[50%] translate-y-[-50%] border-4 border-[var(--color-primary)] w-[55px] h-[55px] rounded-full bg-[var(--color-secondary)] hover:bg-[var(--color-primary)] hover:border-[var(--color-secondary)] hover:text-[var(--color-primary-text)] transition-all duration-300"><i class="fa-solid fa-arrow-right"></i></button>
    </div>
  </main>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Huninn&family=Roboto:ital,wght@0,100..900;1,100..900&display=swap');

</style>