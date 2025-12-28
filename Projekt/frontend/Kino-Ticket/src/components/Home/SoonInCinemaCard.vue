<script lang="ts" setup>
  const props = defineProps<{
    release: Date,
    title: string
  }>()
</script>

<template>
  <div id="card" style="background: linear-gradient(135deg, #4A6FA5 0%, #2D4A6F 50%, #1A2D45 100%); color: var(--color-normal-text); box-shadow: var(--shadow-medium)" class="flex flex-col justify-end gap-1 rounded-4xl px-6 py-6 aspect-video hover:translate-y-[-8px] hover:scale-[1.01] transition-all duration-500 cursor-pointer">
    <div class="flex items-center gap-2 justify-start w-full rounded-2xl">
      <p style="background-color: var(--color-transparent-text)" class="px-2 py-1 rounded-full text-sm">{{props.release.getDay()}}. {{props.release.toLocaleString("de-CH", {month: "short" })}} {{props.release.getFullYear()}}</p>
    </div>
    <div class="flex items-center justify-start w-fit">
      <p class="font-bold">{{ props.title }}</p>
    </div>
  </div>
</template>