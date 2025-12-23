<script lang="ts" setup>
  import Card from "../components/Home/card.vue"
  import SearchBar from "../components/Home/SearchBar.vue";
</script>

<template >
  <div class="min-h-screen">
    <div class="min-h-screen">
      <p>Platzhalter für Animation danach!</p>
    </div>
    <div class="w-full max-w-500 w-full mx-auto my-4 px-6 py-4 rounded-2xl  bg-amber-200">
      <SearchBar></SearchBar>
      <div class="w-full flex items-center justify-center gap-4">
        <Card></Card>
        <Card></Card>
        <Card></Card>
      </div>
    </div>
  </div>
</template>