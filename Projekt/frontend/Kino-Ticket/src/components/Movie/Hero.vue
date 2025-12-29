<script lang="ts" setup>
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
</script>

<template>
  <header style="font-family: 'Bebas Neue', sans-serif;" class="flex items-center justify-start px-10 min-h-screen tracking-wider">
    <div class="w-fit max-w-[550px] ">
      <div style="background-color: var(--color-secondary); color: var(--color-secondary-text)" class="flex items-center justify-start gap-2 overflow-x-auto px-4 py-2 mb-5 text-sm rounded-sm w-fit font-bold">
        <i class="fa-solid fa-award"></i>
        <span class="">{{ props.awards}}</span>
      </div>

      <h1 style="color: var(--color-primary-text); text-shadow: rgba(255, 255, 255, 0.3) 4px 4px 0px; " class="text-7xl font-extrabold tracking-wide mb-5">{{ props.title }}</h1>

      <div class="flex items-center justify-start gap-4 w-full text-base">
        <div style="background-color: var(--color-secondary); color: var(--color-secondary-text)" class="flex items-center justify-center gap-1 rounded-sm px-2 py-1">
          <i class="fa-solid fa-star"></i>
          <span class="font-extrabold">{{ props.rating}}</span>
        </div>

        <span class="px-2 py-1">{{ props.releaseDate.getFullYear() }}</span>

        <span class="px-2 py-1">{{ props.length}} Min</span>

        <span style="border-color: var(--color-normal-text)" class="rounded-sm border-2 px-2 py-1">FSK {{props.ageRating}}</span>

        <span style="background-color: rgba(26, 15, 10, 0.1)" class="rounded-full py-1 px-4">{{ props.genre}}</span>
      </div>

      <p class="my-4 w-full">{{ props.description}}</p>

      <div class="flex items-center justify-start gap-4 w-full">
        <div style="background-color: var(--color-secondary); color: var(--color-secondary-text)" class="cursor-pointer font-bold flex gap-2 py-4 px-6 rounded-md">
          <i class="fa-solid fa-play"></i>
          <span>Tickets buchen</span>
        </div>

        <div style="background-color: var(--color-normal-text); color: var(--color-primary-text)" class="cursor-pointer font-bold flex gap-2 py-4 px-6 rounded-md">
          <i class="fa-solid fa-info"></i>
          <span>Mehr Infos</span>
        </div>
      </div>

      <div class="mt-6 w-full ">
        <span class="block mb-2">Heute im Program</span>
        <div class="flex items-center justify-start gap-4 w-full">
          <span style="background-color: rgba(26, 15, 10, 0.1)" class="py-2 px-4 rounded-md">10:45</span>
          <span style="background-color: rgba(26, 15, 10, 0.1)" class="py-2 px-4 rounded-md">13:40</span>
          <span style="background-color: rgba(26, 15, 10, 0.1)" class="py-2 px-4 rounded-md">18:15</span>
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped>
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Huninn&family=Roboto:ital,wght@0,100..900;1,100..900&display=swap');
</style>