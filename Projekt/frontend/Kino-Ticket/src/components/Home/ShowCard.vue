<script lang="ts" setup>
  const props = defineProps<{
    title: string,
    rating: Number,
    release: Date,
  }>()

</script>

<template>
  <div style="color: var(--color-primary-text)" id="showCard" class="text-sm cursor-pointer overflow-hidden hover:translate-y-[-8px] hover:scale-[1.01] transition-all duration-500">
    <div class="flex items-center justify-center w-full aspect-[10/16] rounded-2xl mb-1 bg-amber-950">
      <i class="fa-solid fa-hippo text-[30px] text-amber-50"></i>
    </div>
    <div class="flex items-center flex-col justify-start w-full p-2">
      <p class="w-full text-start text-base font-semibold whitespace-nowrap">{{ props.title }}</p>
      <div class="flex items-center justify-start w-full gap-2">
        <div class="text-amber-300 flex gap-1">
          <div class="flex items-center justify-center text-[10px]">
            <i class="fa-solid fa-star"></i>
          </div>
          <span class="font-bold">{{ props.rating}}</span>
        </div>
        <span class="font-bold">{{props.release.getFullYear()}}</span>
      </div>
    </div>
  </div>
</template>