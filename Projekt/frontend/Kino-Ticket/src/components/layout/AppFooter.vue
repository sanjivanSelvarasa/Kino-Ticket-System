<script lang="ts" setup>
</script>

<template>
  <div style="background-color: var(--color-secondary); color: var(--color-secondary-text)" class="flex justify-between items-center w-full py-10 px-10">
    <div>
      <h2 class="font-bold">Kino Gold</h2>
    </div>
    <div class="flex justify-between gap-6 py-10 px-6">
      <RouterLink to="/">Impressum</RouterLink>
      <RouterLink to="/">Datenschutz</RouterLink>
      <RouterLink to="/">AGB</RouterLink>
      <RouterLink to="/">Kontakt</RouterLink>
      <RouterLink to="/">Jobs</RouterLink>
    </div>
    <div class="flex justify-between gap-5">
      <i class="fa-brands fa-twitter text-xl rounded-full border-2 w-20px h-20px mx-2 my-2"></i>
      <i class="fa-brands fa-youtube text-xl rounded-full border-2 w-20px h-20px mx-2 my-2"></i>
      <i class="fa-brands fa-instagram text-xl rounded-full border-2 w-20px h-20px mx-2 my-2"></i>
    </div>
  </div>
</template>