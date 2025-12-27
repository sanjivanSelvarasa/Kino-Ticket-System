<script lang="ts" setup>
</script>

<template>
  <div id="card" style="background: linear-gradient(135deg, #4A6FA5 0%, #2D4A6F 50%, #1A2D45 100%); color: var(--color-normal-text)" class="flex flex-col justify-around gap-3 rounded-4xl px-6 py-6 aspect-video">
    <div style="background-color: var(--color-transparent-text)" class="ml-auto flex items-center justify-center w-fit px-4 py-2 rounded-full">
      <i class="fa-solid fa-star"></i>
      <p class="ml-1">8.5</p>
      <div class="w-5 h-5 flex items-center justify-center text-[5px]">
        <i class="fa-solid fa-circle"></i>
      </div>
      <p>Neu</p>
    </div>
    <h2 class="text-4xl font-semibold px-2">The Adventure of Blue Sword</h2>
    <div class="flex items-center gap-2 justify-start w-full rounded-2xl">
      <p style="background-color: var(--color-transparent-text)" class="px-4 py-2 rounded-2xl">Action</p>
      <p style="background-color: var(--color-transparent-text)" class="px-4 py-2 rounded-2xl ">2024</p>
      <p style="background-color: var(--color-transparent-text)" class="px-4 py-2 rounded-2xl ">2h 15m</p>
    </div>
    <div style="background-color: var(--color-transparent-text)" class="cursor-pointer flex items-center justify-start w-fit max-w-[50%] px-4 py-4 rounded-full ">
      <div style="background-color: var(--color-primary)" class="flex items-center justify-center w-10 h-10 px-4 py-4 rounded-full">
        <i class="fa-solid fa-play"></i>
      </div>
      <p class="ml-4 mr-4 font-bold">Jetzt abspielen</p>
    </div>
  </div>
</template>