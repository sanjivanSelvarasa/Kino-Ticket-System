<script lang="ts" setup>
import Item from "../components/ShoppingCart/Item.vue";
import Summary from "../components/ShoppingCart/Summary.vue";
</script>

<template>
  <div class="w-fit mx-auto my-30">
    <h1 style="font-size: 50px" class="text-center">Warenkorb</h1>
      <div class="flex justify-between items-start gap-4">
      <div class="flex flex-col justify-center items-center gap-5">
        <Item v-for="i in 5" id="" image="" title="" :date="new Date()" time="" seats="" price=""></Item>
      </div>
      <Summary id="1" artical="3" price="3"></Summary>
    </div>
  </div>
</template>

<style scoped></style>