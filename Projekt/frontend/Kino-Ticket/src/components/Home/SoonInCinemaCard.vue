<script lang="ts" setup>
  const props = defineProps<{
    id: number,
    release: Date,
    title: string,
    image: string,
  }>()
</script>

<template>
  <RouterLink :to="{name: 'movieDetail', params: {id: props.id}}" id="card" :style="{ backgroundImage: `url(${props.image})`}" style="color: var(--color-normal-text); box-shadow: var(--shadow-medium)" class="bg-center bg-cover flex flex-col justify-end gap-1 rounded-4xl px-6 py-6 aspect-video hover-up cursor-pointer">
    <div class="flex items-center gap-2 justify-start w-full rounded-2xl">
      <p style="background-color: var(--color-transparent-text)" class="backdrop-blur-lg px-2 py-1 rounded-full text-sm">{{props.release.getDay()}}. {{props.release.toLocaleString("de-CH", {month: "short" })}} {{props.release.getFullYear()}}</p>
    </div>
    <div class="flex items-center justify-start w-fit">
      <p class="font-bold">{{ props.title }}</p>
    </div>
  </RouterLink>
</template>