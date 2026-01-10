<script lang="ts" setup>
</script>

<template>
  <div style="background-color: var(--color-secondary); color: var(--color-secondary-text)" class="flex justify-between items-center w-full py-10 px-10">
    <div class="flex items-center justify-center bg-[var(--color-primary)] rounded-md">
      <img src="../../assets/images/logo.png" alt="logo" class="w-[200px] max-h-[80px] object-cover" />
    </div>
    <div class="flex justify-between gap-6 py-10 px-6">
      <RouterLink class="" to="/">Impressum</RouterLink>
      <RouterLink to="/">Datenschutz</RouterLink>
      <RouterLink to="/">AGB</RouterLink>
      <RouterLink to="/">Kontakt</RouterLink>
      <RouterLink to="/">Jobs</RouterLink>
    </div>
    <div class="flex justify-between gap-5">
      <div class="w-8 h-8 flex items-center justify-center border-2 rounded-full cursor-pointer">
        <i class="fa-brands fa-twitter"></i>
      </div>
      <div class="w-8 h-8 flex items-center justify-center border-2 rounded-full cursor-pointer">
        <i class="fa-brands fa-instagram"></i>
      </div>
      <div class="w-8 h-8 flex items-center justify-center border-2 rounded-full cursor-pointer">
        <i class="fa-brands fa-youtube"></i>
      </div>
    </div>
  </div>
</template>