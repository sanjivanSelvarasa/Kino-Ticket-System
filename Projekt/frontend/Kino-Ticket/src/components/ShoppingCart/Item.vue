<script lang="ts" setup>
import {computed, ref} from "vue";
import {cartApi} from "../../api/cart.api.ts";

  const props = defineProps<{
    id: string;
    image: string,
    title: string,
    date: Date,
    time: string,
    seat: string,
    price: number,
  }>()

  const emit = defineEmits<{
    (e: "delete", id: string): void
  }>();

  function handleDelete() {
    emit("delete", props.id);
  }

  const dateObj = computed(() => new Date(props.date));
  const d = dateObj.value.getDate().toString().padStart(2, "0");
  const m = (dateObj.value.getMonth() + 1).toString().padStart(2, "0");
</script>

<template>
  <div class="w-fit min-w-[600px] h-fit justify-between items-center flex gap-5 p-5 rounded-md border-2 border-zinc-700/50 bg-gradient-to-br from-zinc-900 to-zinc-800 shadow-2xl hover:shadow-red-900/20 transition-all duration-300 max-md:min-w-[calc(100vw-4rem)]">
    <div class="flex justify-center items-center h-full gap-5">
      <div :style="{ backgroundImage: `url(https://image.tmdb.org/t/p/w500${props.image})` }" class="bg-center bg-cover w-20 aspect-[5/7] bg-gradient-to-br from-red-600 to-red-800 rounded-md flex justify-center items-center "></div>
      <div class="flex justify-center items-start flex-col gap-1 text-zinc-400">
        <h3 class="text-[var(--color-normal-text)] text-xl font-bold">{{ props.title }}</h3>
        <div class="flex justify-center items-center gap-1">
          <i class="fa-regular fa-calendar"></i>
          <span class="text-sm"> {{ d }}.{{ m}}.{{dateObj.getFullYear()}} • {{props.time.slice(0,5)}} Uhr</span>
        </div>
        <div class="flex justify-center items-center gap-1">
          <i class="fa-solid fa-location-dot"></i>
          <span class="text-sm">{{ props.seat }}</span>
        </div>
      </div>
    </div>
    <div class="flex justify-center items-end flex-col h-full gap-3">
      <span class="text-[var(--color-primary)] text-2xl font-bold">{{props.price}}
       <span class="text-sm font-normal">CHF</span>
      </span>
<!--      <div class="flex justify-center items-center bg-zinc-800 border-zinc-700/50 border px-2 py-2 rounded-md gap-7">-->
<!--        <button class="cursor-pointer w-8 h-8 bg-zinc-700 px-3 py-1 rounded-md">-</button>-->
<!--        <span class="font-bold text-lg min-w-[20px] text-center">2</span>-->
<!--        <button class="cursor-pointer w-8 h-8 bg-zinc-700 px-3 py-1 rounded-md">+</button>-->
<!--      </div>-->
      <div class="cursor-pointer flex justify-center items-end gap-1 text-red-500">
        <div class="flex justify-center items-center mb-[1px]">
          <i class="fa-solid fa-trash text-xs"></i>
        </div>
        <button @click="handleDelete" class="cursor-pointer text-xs underline">Entfernen</button>
      </div>
    </div>
  </div>
</template>

<style>

</style>