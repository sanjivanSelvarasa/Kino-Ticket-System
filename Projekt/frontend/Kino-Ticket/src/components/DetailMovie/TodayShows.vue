<script lang="ts" setup>
  const props = defineProps<{
    id: string,
    title: string,
    image: string | null,
    todayShow: string[]
  }>()
</script>

<template>
  <RouterLink :to="{ name: 'movieDetail', params: { id: props.id}}" class="cursor-pointer aspect-[4/3] bg-[var(--color-secondary)] border-2 border-[var(--color-primary)] rounded-xl overflow-hidden hover-up">
    <div class="mb-2 w-full h-[150px] bg-amber-50"></div>
    <div class="px-4 py-4">
      <p class="font-bold pb-2">{{ props.title }}</p>
      <div class="flex items-center justify-start gap-2 overflow-x-hidden w-full text-xs">
        <span v-for="item in todayShow" class="px-2 py-1 rounded-md bg-[var(--color-primary)] font-bold text-sm">{{item}}</span>
      </div>
    </div>
  </RouterLink>
</template>

<style scoped>

</style>