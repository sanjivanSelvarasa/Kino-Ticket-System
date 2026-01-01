<script lang="ts" setup>
  const props = defineProps<{
    title: string,
    image: string | null,
    todayShow: string[]
  }>()
</script>

<template>
  <div class="aspect-[4/3] bg-[var(--color-secondary)] border-1 border-[var(--color-primary)] rounded-xl overflow-hidden">
    <div class="mb-2 w-full h-[150px] bg-amber-50"></div>
    <div class="px-4 py-4">
      <p class="font-bold pb-2">{{ props.title }}</p>
      <div class="flex items-center justify-start gap-2 overflow-x-hidden w-full text-xs">
        <span v-for="item in todayShow" class="px-2 py-1 rounded-md bg-[var(--color-primary)] font-bold">{{item}}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>