<script setup lang="ts">
  import { RouterView } from "vue-router";
  import AppHeader from "./components/layout/AppHeader.vue";
  import AppFooter from "./components/layout/AppFooter.vue";
</script>

<template>
  <AppHeader />

  <div class="bg-blue-500">hello world</div>

  <RouterView></RouterView>
  <AppFooter />
</template>

