<script lang="ts" setup>
import { ref } from 'vue';

const activeTab = ref('film');

const tabs = [
  { id: 'film', label: 'Film' },
  { id: 'serien', label: 'Serien' },
  { id: 'originals', label: 'Originals' }
];
</script>

<template>
  <div class="flex justify-center items-center w-full max-w-xl mx-auto p-4">
    <div
        style="background-color: #4a3a2a; border-radius: 2.5rem;"
        class="flex items-center gap-2 px-3 py-3 w-full"
    >
      <!-- Tab Buttons -->
      <div class="flex gap-2 flex-1">
        <button
            v-for="tab in tabs"
            :key="tab.id"
            @click="activeTab = tab.id"
            :style="{
            backgroundColor: activeTab === tab.id ? 'var(--color-primary)' : 'transparent',
            color: activeTab === tab.id ? 'var(--color-primary-text)' : 'var(--color-normal-text)',
            borderRadius: '2rem',
            transition: 'all 0.3s ease'
          }"
            class="px-6 py-3 font-bold text-sm hover:opacity-80 flex-1 cursor-pointer"
        >
          {{ tab.label }}
        </button>
      </div>

      <!-- Search Icon -->
      <button
          style="background-color: var(--color-secondary); border-radius: 50%; width: 3rem; height: 3rem;"
          class="flex items-center justify-center hover:opacity-80 transition-opacity flex-shrink-0 cursor-pointer"
      >
        <i class="fa-solid fa-magnifying-glass" style="color: var(--color-primary);"></i>
      </button>
    </div>
  </div>
</template>