<script lang="ts" setup>
  const props = defineProps<{
    svg: string,
    text: string,
    width: string
  }>()
</script>

<template>
  <div style="color: var(--color-secondary-text); background-color: var(--color-secondary)" :class="width" class="px-6 py-4 rounded-full flex justify-center items-center gap-2 flex-nowrap">
    <div class="w-10 h-5 flex items-center justify-center text-[20px]">
      <i :class=props.svg class=""></i>
    </div>
    <p class="mr-2">{{ props.text }}</p>
  </div>
</template>