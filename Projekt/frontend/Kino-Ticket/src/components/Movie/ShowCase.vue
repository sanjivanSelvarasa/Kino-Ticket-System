<script lang="ts" setup>
  const props = defineProps<{
    id: number,
    image: string,
    rating: number,
    title: string,
    genre: string,
    length: number,
  }>()
</script>

<template>
  <RouterLink :to="{ name: 'movieDetail', params: { id: props.id}}" style="color: var(--color-primary-text)" class="w-[200px] overflow-hidden flex-none hover-up cursor-pointer">
    <div :style="{ backgroundImage: `url(${props.image})`}" class="h-[350px] rounded-md bg-center bg-cover">
      <div style="background-color: var(--color-primary); color: var(--color-primary-text)" class="flex items-center justify-center gap-1 px-2 py-1 w-fit m-2 rounded-md float-right text-sm">
        <i class="fa-solid fa-star text-xs"></i>
        <span>{{props.rating}}</span>
      </div>
    </div>
    <h5 class="font-bold text-sm ml-1 mt-2 whitespace-nowrap">{{props.title}}</h5>
    <div class="flex items-center justify-start gap-1 w-full text-xs ml-1">
      <span>{{props.genre}}</span>
      <i class="fa-solid fa-circle text-[3px]"></i>
      <span>{{props.length}} Min</span>
    </div>
  </RouterLink>
</template>