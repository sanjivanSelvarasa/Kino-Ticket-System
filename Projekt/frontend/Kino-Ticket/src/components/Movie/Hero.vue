<script lang="ts" setup>
  import Loading from "../layout/Loading.vue";

  const props = defineProps<{
    id: number,
    image: string,
    title: string,
    awards: string,
    rating: string,
    releaseDate: Date,
    length: number,
    ageRating: number,
    genre: string,
    description: string,
    programTimes: { time: string}[],
  }>()

</script>

<template>
  <div class="w-screen flex justify-center items-center">
  <header style="font-family: 'Bebas Neue', sans-serif;" class="mt-10 flex items-center justify-between flex-row-reverse px-10 min-h-screen tracking-wider gap-40 max-w-[1700px] max-xl:flex-col-reverse">
    <TransitionGroup name="fade-slide" tag="div" appear>
      <div key="image" :style="{ backgroundImage: `url(${props.image})`, transitionDelay: `${0 * 80}ms`}" class="bg-right bg-cover aspect-square border-6 border-[var(--color-secondary)] rounded-2xl h-[35rem] max-md:w-full"></div>
    </TransitionGroup>
      <TransitionGroup name="fade-slide" tag="div" class="w-fit max-w-[550px]" appear>
      <div key="awards" :style="{ transitionDelay: `${0 * 80}ms` }" style="background-color: var(--color-secondary); color: var(--color-secondary-text); " class="flex items-center justify-start gap-2 overflow-x-auto px-4 py-2 mb-5 text-sm rounded-sm w-fit font-bold">
        <i class="fa-solid fa-award"></i>
        <span>{{ props.awards}}</span>
      </div>

      <h1 key="title" :style="{ transitionDelay: `${1 * 80}ms` }" class="tracking-wide">{{ props.title }}</h1>

      <div key="rating" class="flex items-center justify-start gap-4 w-full text-base">
        <div style="background-color: var(--color-secondary); color: var(--color-secondary-text)" class="flex items-center justify-center gap-1 rounded-sm px-2 py-1">
          <i class="fa-solid fa-star"></i>
          <span class="font-extrabold">{{ props.rating}}</span>
        </div>

        <span key="date" :style="{ transitionDelay: `${2 * 80}ms` }" class="px-2 py-1">{{ props.releaseDate.getFullYear() }}</span>

        <span key="length" :style="{ transitionDelay: `${3 * 80}ms` }" class="px-2 py-1">{{ props.length}} Min</span>

        <span key="ageRating" :style="{ transitionDelay: `${4 * 80}ms` }" style="border-color: var(--color-normal-text)" class="rounded-sm border-2 px-2 py-1">FSK {{props.ageRating}}</span>

        <span key="genre" :style="{ transitionDelay: `${5 * 80}ms` }" style="background-color: rgba(26, 15, 10, 0.1)" class="rounded-full py-1 px-4">{{ props.genre}}</span>
      </div>

      <p key="description" :style="{ transitionDelay: `${6 * 80}ms` }" class="my-4 w-full">{{ props.description}}</p>

      <div key="booking" :style="{ transitionDelay: `${7 * 80}ms` }" class="flex items-center justify-start gap-4 w-full">
        <RouterLink :to="{ name: 'tickets', params: {id: props.id}}" class="cursor-pointer text-[var(--color-secondary-text)] bg-[var(--color-secondary)] font-bold flex gap-2 py-4 px-6 rounded-md border-2 hover:border-[var(--color-secondary)] hover:bg-[var(--color-primary)] hover:text-[var(--color-primary-text)] hover:scale-[1.01] transition-all duration-500">
          <div class="flex items-center justify-center">
            <i class="fa-solid fa-play"></i>
          </div>
          <div>Tickets buchen</div>
        </RouterLink>

        <button class="bg-[var(--color-normal-text)] text-[var(--color-primary-text)] cursor-pointer font-bold flex gap-2 py-4 px-6 rounded-md border-2 border-transparent hover:border-[var(--color-normal-text)] hover:bg-[var(--color-primary-text)] hover:text-[var(--color-normal-text)] hover:scale-[1.01] transition-all duration-500">
          <div class="flex items-center justify-center">
            <i class="fa-solid fa-info"></i>
          </div>
          <span>Trailer ansehen</span>
        </button>
      </div>

      <div key="time" :style="{ transitionDelay: `${8 * 80}ms` }" class="mt-6 w-full ">
        <span class="block mb-2">Heute im Program</span>
        <div class="flex items-center justify-start gap-4 w-full">
          <span v-for="item in props.programTimes" style="background-color: rgba(26, 15, 10, 0.1)" class="py-2 px-4 rounded-md">{{ item.time.slice(0,5) }}</span>
        </div>
      </div>
    </TransitionGroup>
  </header>
  </div>
</template>

<style scoped>
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Huninn&family=Roboto:ital,wght@0,100..900;1,100..900&display=swap');
</style>