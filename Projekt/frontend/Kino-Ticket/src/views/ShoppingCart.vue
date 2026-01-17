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
        cart.value.map(async c => {
          const tmdb = await searchMovies(c.title);
          return {
            ...c,
            poster_path: tmdb?.poster_path ? `https://image.tmdb.org/t/p/w500${tmdb.poster_path}` : null,
          };
        })
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

async function onSubmit(){
  for (let i = 0; i < cart.value.length; i++) {
    await buyTicket(cart.value[i].ticketid);
  }
  alert('Vielen Dank fürs Einkaufen bei Kino Gold')
  await updateCart();
}

async function buyTicket(ticketId:string){
  try{
    await cartApi.updateCart(ticketId)
  }catch(e: any){
    error.value = e.message ?? 'Ticket kaufen hat nicht funktioniert';
  }
}

const totalPrice = computed(() => {
  if (!Array.isArray(cart.value) || cart.value.length === 0) {
    return 0;
  }
  return cart.value.reduce((acc, item) => acc + Number(item.price), 0);
});
</script>

<template>
  <div class="w-fit mx-auto my-30 min-h-screen">
    <h1 style="font-size: 50px" class="text-center">Warenkorb</h1>
      <div class="flex justify-between items-start gap-4 mx-2 max-lg:flex-col-reverse">
        <div class="flex flex-col justify-center items-center gap-5">
          <Item v-if="!loading" v-for="item in cart" @delete="onDelete(item.ticketid)" :id="item.ticketid" :image="item.poster_path" :title="item.title" :date="item.date" :time="item.start_time" :seat="item.name" :price="item.price"></Item>
        </div>
        <Summary @submit="onSubmit" v-if="!loading && cart.length !== 0" :artical="cart.length" :price="totalPrice" class="max-lg:w-full"></Summary>
      </div>
    <div v-if="cart.length === 0"  class="flex justify-center items-center gap-2 text-xl flex-nowrap w-screen h-[calc(100vh/2)] text-[var(--color-primary-text)]">
      <div class="flex justify-center items-center">
        <i class="fa-solid fa-cart-shopping"></i>
      </div>
      <p>Warenkorb leer</p>
    </div>
  </div>
</template>

<style scoped></style>