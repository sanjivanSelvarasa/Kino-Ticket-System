<script lang="ts" setup>
  const props = defineProps<{
    svg: string,
    text: string,
  }>()

  const emit = defineEmits<{
    (e: "select", value: string ): void
  }>();

  function clickGenre(genre: string ): void {
    emit("select", genre);
  }
</script>

<template>
  <button @click="clickGenre(props.text)" style="color: var(--color-secondary-text)" class="group focus:bg-[var(--color-primary)] transition-all bg-[var(--color-secondary)] hover:bg-[var(--color-primary)] cursor-pointer px-6 py-4 rounded-full flex justify-center items-center gap-2 flex-nowrap">
    <div class="w-10 h-5 flex items-center justify-center text-[20px] group-focus:text-[var(--color-primary-text)] group-hover:text-[var(--color-primary-text)]">
      <i :class="props.svg"></i>
    </div>
    <p class="mr-2 group-hover:text-[var(--color-primary-text)] group-focus:text-[var(--color-primary-text)]">{{ props.text }}</p>
  </button>
</template>