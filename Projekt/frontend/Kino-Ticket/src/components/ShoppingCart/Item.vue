<script lang="ts" setup>
  const props = defineProps<{
    id: string,
    image: string,
    title: string,
    date: Date,
    time: string,
    seats: string,
    price: number,
  }>()
</script>

<template>
  <div class="w-fit min-w-[600px] h-fit justify-between items-center flex gap-5 p-5 rounded-md border-2 border-zinc-700/50 bg-gradient-to-br from-zinc-900 to-zinc-800 shadow-2xl hover:shadow-red-900/20 transition-all duration-300">
    <div class="flex justify-center items-center h-full gap-5">
      <div class="w-20 aspect-[5/7] bg-gradient-to-br from-red-600 to-red-800 rounded-md flex justify-center items-center ">Film</div>
      <div class="flex justify-center items-start flex-col gap-1 text-zinc-400">
        <h3 class="text-[var(--color-normal-text)] text-xl font-bold">Interstellar</h3>
        <div class="flex justify-center items-center gap-1">
          <i class="fa-regular fa-calendar"></i>
          <span class="text-sm">Fr, 15. März 2024 • 20:00 Uhr</span>
        </div>
        <div class="flex justify-center items-center gap-1">
          <i class="fa-solid fa-location-dot"></i>
          <span class="text-sm">Reihe 5, Platz 12-13</span>
        </div>
      </div>
    </div>
    <div class="flex justify-center items-end flex-col h-full gap-3">
      <span class="text-[var(--color-primary)] text-2xl font-bold">25.00
       <span class="text-sm font-normal">CHF</span>
      </span>
      <div class="flex justify-center items-center bg-zinc-800 border-zinc-700/50 border px-2 py-2 rounded-md gap-7">
        <button class="cursor-pointer w-8 h-8 bg-zinc-700 px-3 py-1 rounded-md">-</button>
        <span class="font-bold text-lg min-w-[20px] text-center">2</span>
        <button class="cursor-pointer w-8 h-8 bg-zinc-700 px-3 py-1 rounded-md">+</button>
      </div>
      <div class="cursor-pointer flex justify-center items-end gap-1 text-red-500">
        <div class="flex justify-center items-center mb-[1px]">
          <i class="fa-solid fa-trash text-xs"></i>
        </div>
        <span class="text-xs underline">Entfernen</span>
      </div>
    </div>
  </div>
</template>

<style>

</style>