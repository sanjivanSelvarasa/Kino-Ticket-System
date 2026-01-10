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

    console.log(cart.value)
  }catch(e: any){
    error.value = e.message || 'Warenkorb laden schiefgelaufen';
    console.error(error.value);
  }finally{
    loading.value = false;
  }
})
</script>

<template>
  <div class="w-fit mx-auto my-30 min-h-screen">
    <h1 style="font-size: 50px" class="text-center">Warenkorb</h1>
      <div class="flex justify-between items-start gap-4 mx-2 max-lg:flex-col-reverse">
        <div class="flex flex-col justify-center items-center gap-5">
          <Item v-if="!loading" v-for="i in cart" :image="i.poster_image" :title="i.title" :date="i.date" :time="i.start_time" :seat="i.name" :price="i.price"></Item>
        </div>
        <Summary v-if="!loading && cart.length !== 0" :artical="cart.length" :price="cart.reduce((acc, item) =>  acc + Number(item.price), 0)" class="max-lg:w-full"></Summary>
      </div>
    <div v-if="cart.length === 0"  class="flex justify-center items-center gap-2 text-xl flex-nowrap w-full h-1/2">
      <div class="flex justify-center items-center">
        <i class="fa-solid fa-cart-shopping"></i>
      </div>
      <p>Warenkorb leer</p>
    </div>
  </div>
</template>

<style scoped></style>