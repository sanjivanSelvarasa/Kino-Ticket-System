<script lang="ts" setup>
import Item from "../components/ShoppingCart/Item.vue";
import Summary from "../components/ShoppingCart/Summary.vue";
import {computed, onMounted, ref} from "vue";
import {cartApi} from "../api/cart.api.ts";
import { searchMovies } from "../api/tmdb.api";

const cart = ref<any[]>([]);
const error = ref<string>('');
const loading = ref<boolean>(true);

onMounted( async () => {
  await updateCart();
})

async function updateCart() {
  try{
    loading.value = true;
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
}

async function onDelete(id: string) {
  if(id === '') {
    error.value = "Id nicht gesetzt!"
    return;
  }

  try{
    await cartApi.deleteCart(id)
  }catch(e: any){
    error.value = e ?? `Warenkorb Film löschen hat nicht funktioniert`;
  } finally{
    await updateCart();
  }
}
</script>

<template>
  <div class="w-fit mx-auto my-30 min-h-screen">
    <h1 style="font-size: 50px" class="text-center">Warenkorb</h1>
      <div class="flex justify-between items-start gap-4 mx-2 max-lg:flex-col-reverse">
        <div class="flex flex-col justify-center items-center gap-5">
          <Item v-if="!loading" v-for="item in cart" @delete="onDelete(item.ticketid)" :id="item.ticketid" :image="item.poster_image" :title="item.title" :date="item.date" :time="item.start_time" :seat="item.name" :price="item.price"></Item>
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