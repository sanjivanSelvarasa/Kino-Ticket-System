<script lang="ts" setup>
</script>

<template>
  <div id="header" style="font-family: var(--font-family-base), 'Droid Sans'" class="flex items-center justify-between w-full px-10 py-6 text-black">
    <div class="">
      <div class="flex justify-between align-middle w-30 h-10">
        <img src="..\..\src\assets\vue.svg" alt="logo">
      </div>
    </div>
    <div class="flex flex-row w-lg ">
      <RouterLink class="py-3 px-4 mx-3" to="/">Home</RouterLink>
      <RouterLink class="py-3 px-4" to="/movie">Filme</RouterLink>
      <RouterLink class="py-3 px-4" to="/">Programm</RouterLink>
      <RouterLink class="py-3 px-4" to="/login">Login</RouterLink>
      <RouterLink class="py-3 px-4" to="/">Über uns</RouterLink>
    </div>
    <div class="flex  gap-2">
      <RouterLink to="/" style="border-color: var(--color-secondary);" class="border-2 rounded-full py-3 px-4"><i class="fa-solid fa-magnifying-glass"></i></RouterLink>
      <RouterLink to="/" style="background: var(--color-secondary); color: var(--color-secondary-text)" class="py-3 px-6 rounded-full text-base font-semibold">Tickets Kaufen</RouterLink>
    </div>
  </div>
</template>