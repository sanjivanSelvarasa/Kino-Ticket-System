<script lang="ts" setup>
const props = defineProps<{
  id: string,
  artical: number,
  price: number,
}>()
</script>

<template>
  <div class="w-fit min-w-[400px] h-fit justify-between items-start flex flex-col gap-5 p-5 rounded-md border-2 border-zinc-700/50 bg-gradient-to-br from-zinc-900 to-zinc-800 shadow-2xl hover:shadow-red-900/20 transition-all duration-300">
    <h3 class="text-2xl font-bold">Zusammenfassung</h3>
    <div class="w-full flex justify-between items-start flex-col gap-3">
      <div class="w-full flex justify-between items-center gap-1">
        <span>Artikel (4)</span>
        <span>45.50 CHF</span>
      </div>
      <div class="w-full flex justify-between items-center gap-1">
        <span>Buchungsgebühr</span>
        <span>2.50 CHF</span>
      </div>
    </div>
    <hr style="margin: 0;" class="border-t-2 border-b-red-500 w-full">
    <div class="flex justify-between items-center w-full">
      <span class="text-xl font-bold">Gesamt</span>
      <span>48.00 CHF</span>
    </div>
    <button class="cursor-pointer w-full rounded-lg bg-[var(--color-primary)] px-4 py-4 font-bold text-md">Zur Kasse</button>
  </div>
</template>

<style scoped>
</style>