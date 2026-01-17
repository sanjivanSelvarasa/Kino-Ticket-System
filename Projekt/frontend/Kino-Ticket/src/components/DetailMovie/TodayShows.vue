<script lang="ts" setup>
  const props = defineProps<{
    id: string,
    title: string,
    image: string,
    programtime: { time: string}[],
  }>()
</script>

<template>
  <RouterLink :to="{ name: 'movieDetail', params: { id: props.id}}" class="flex flex-col justify-between gap-2 text-xl cursor-pointer aspect-[16/9] bg-[var(--color-secondary)] border-2 border-[var(--color-primary)] rounded-xl overflow-hidden hover-up">
    <div class="mb-2 w-full h-[300px] bg-center bg-cover" :style="{ backgroundImage: `url(${props.image})`}"></div>
    <div class="px-4 py-4">
      <p class="font-bold pb-2">{{ props.title }}</p>
      <div class="flex items-center justify-start gap-2 overflow-x-hidden w-full text-xs">
        <span v-for="item in programtime" class="px-2 py-1 rounded-md bg-[var(--color-primary)] font-bold text-sm">{{ item.time.slice(0,5) }}</span>
      </div>
    </div>
  </RouterLink>
</template>

<style scoped>

</style>