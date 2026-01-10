<script lang="ts" setup>
  const props = defineProps<{
    id: string,
    title: string,
    rating: Number,
    release: Date,
    image: string,
  }>()

</script>

<template>
  <RouterLink :to="{name: 'movieDetail', params: { id: props.id}}" style="color: var(--color-primary-text)" id="showCard" class="text-sm cursor-pointer overflow-x-hidden hover-up">
    <div :style="{ backgroundImage: `url(${props.image})`}" class="bg-center bg-cover flex items-center justify-center w-full aspect-[10/16] rounded-2xl mb-1"></div>
    <div class="flex items-center flex-col justify-start w-full p-2">
      <p class="w-full text-start text-base font-semibold whitespace-nowrap">{{ props.title }}</p>
      <div class="flex items-center justify-start w-full gap-2">
        <div class=" flex gap-1">
          <div class="flex items-center justify-center text-[10px]">
            <i class="fa-solid fa-star"></i>
          </div>
          <span class="font-bold">{{ props.rating}}</span>
        </div>
        <span class="font-bold">{{props.release.getFullYear()}}</span>
      </div>
    </div>
  </RouterLink>
</template>