<script lang="ts" setup>
import Item from "../components/ShoppingCart/Item.vue";
import Summary from "../components/ShoppingCart/Summary.vue";
import { onMounted, ref} from "vue";
import {cartApi} from "../api/cart.api.ts";
import { searchMovies } from "../api/tmdb.api";

const cart = ref<any[]>([]);
const error = ref<string>('');
const loading = ref<boolean>(true);
onMounted( async () => {
  try{
    cart.value = await cartApi.getCart()

      cart.value = await Promise.all(
          cart.value.map(async (item:any)=> ({
        ...item,
        poster_image: await searchMovies(item.image),
      }))
    );
  }catch(e: any){
    error.value = e.message || 'Warenkorb laden schiefgelaufen';
    console.error(error.value);
  }finally{
    loading.value = false;
  }
})
</script>

<template>
  <div class="w-fit mx-auto my-30">
    <h1 style="font-size: 50px" class="text-center">Warenkorb</h1>
      <div class="flex justify-between items-start gap-4">
      <div class="flex flex-col justify-center items-center gap-5">
        <Item v-if="!loading" v-for="i in cart" :image="i.poster_image" :title="i.title" :date="i.date" :time="i.time" :seat="i.name" :price="i.price"></Item>
      </div>
      <Summary v-if="!loading" id="1" artical="3" price="3"></Summary>
    </div>
  </div>
</template>

<style scoped></style>