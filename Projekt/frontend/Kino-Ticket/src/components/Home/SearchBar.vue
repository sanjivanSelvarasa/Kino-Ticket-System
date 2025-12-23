<script lang="ts" setup>
</script>

<template>
    <div id="searchBar" class="flex justify-center items-center max-w-500 w-full mx-auto my-4 px-6 py-4 rounded-2xl ">
      <div style="background-color: var(--color-secondary); color: var(--color-primary-text)" class="font-bold w-150 gap-4 flex justify-center items-center px-4 py-2 rounded-2xl ">
        <div style="background-color: var(--color-primary); " class="cursor-pointer flex items-center justify-center w-full px-6 py-4 rounded-2xl ">
          <p>Filme</p>
        </div>
        <div style="background-color: var(--color-primary)" class="cursor-pointer flex items-center justify-center w-full px-6 py-4 rounded-2xl ">
          <p>Serien</p>
        </div>
        <div style="background-color: var(--color-primary)" class="cursor-pointer flex items-center justify-center w-full px-6 py-4 rounded-2xl ">
          <p>Originals</p>
        </div>
        <div style="background-color: var(--color-primary)" class="w-10 h-10 flex items-center justify-center p-4 rounded-full">
          <i class="fa-solid fa-magnifying-glass"></i>
        </div>
      </div>
    </div>
</template>