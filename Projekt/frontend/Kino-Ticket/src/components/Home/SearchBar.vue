<script lang="ts" setup>
import { ref } from 'vue';

const activeTab = ref('film');
const isSearchOpen = ref(false);
const searchValue = ref('');

const tabs = [
  { id: 'film', label: 'Film' },
  { id: 'serien', label: 'Serien' },
  { id: 'originals', label: 'Originals' }
];

const handleSearchClick = () => {
  isSearchOpen.value = true;
};

const handleSearchClose = () => {
  isSearchOpen.value = false;
  searchValue.value = '';
};
</script>

<template>
  <div class="flex justify-center items-center w-full max-w-xl mx-auto p-4">
    <div
        style="background-color: #4a3a2a;"
        class="relative flex items-center gap-2 px-3 py-3 w-full rounded-[2.5rem] overflow-hidden"
    >
      <!-- Tab Buttons -->
      <div
          class="flex gap-2 flex-1 transition-all duration-500 ease-in-out"
          :style="{
          opacity: isSearchOpen ? 0 : 1,
          transform: isSearchOpen ? 'translateX(-20px)' : 'translateX(0)',
          pointerEvents: isSearchOpen ? 'none' : 'auto'
        }"
      >
        <button
            v-for="tab in tabs"
            :key="tab.id"
            @click="activeTab = tab.id"
            :style="{
              backgroundColor: activeTab === tab.id ? '#FDCD1F' : 'transparent',
              color: activeTab === tab.id ? '#1a0f0a' : '#ffffff'
            }"
            class="px-6 py-3 font-bold text-sm hover:opacity-80 flex-1 cursor-pointer rounded-[2rem] transition-all duration-300"
        >
          {{ tab.label }}
        </button>
      </div>

      <!-- Search Expansion Container -->
      <div
          class="absolute inset-0 flex items-center px-3 transition-all duration-500 ease-in-out"
          :style="{
          opacity: isSearchOpen ? 1 : 0,
          pointerEvents: isSearchOpen ? 'auto' : 'none'
        }"
      >
        <!-- Search Input -->
        <div class="flex items-center gap-3 w-full">
          <button
              @click="handleSearchClose"
              class="flex items-center justify-center w-12 h-12 rounded-full flex-shrink-0 cursor-pointer hover:opacity-80 transition-all duration-300"
              :style="{
              backgroundColor: '#1a0f0a',
              transform: isSearchOpen ? 'translateX(0)' : 'translateX(400px)'
            }"
          >
            <i class="fa-solid fa-magnifying-glass" style="color: #FDCD1F;"></i>
          </button>

          <input
              v-model="searchValue"
              type="text"
              placeholder="Suchen..."
              class="flex-1 bg-transparent border-none outline-none text-lg font-medium search-input"
              :style="{
              color: '#ffffff',
              transform: isSearchOpen ? 'translateX(0)' : 'translateX(400px)',
              transition: 'transform 0.5s ease-in-out 0.1s'
            }"
              :autofocus="isSearchOpen"
          />

          <button
              v-if="searchValue"
              @click="searchValue = ''"
              class="flex items-center justify-center w-8 h-8 rounded-full flex-shrink-0 cursor-pointer hover:opacity-80 transition-all duration-300 fade-in"
              style="background-color: rgba(26, 15, 10, 0.5);"
          >
            <i class="fa-solid fa-xmark" style="color: #ffffff; font-size: 1rem;"></i>
          </button>
        </div>
      </div>

      <!-- Search Icon Button -->
      <button
          @click="handleSearchClick"
          class="relative flex items-center justify-center flex-shrink-0 cursor-pointer hover:opacity-80 transition-all duration-500 ease-in-out rounded-full"
          :style="{
          backgroundColor: '#1a0f0a',
          width: isSearchOpen ? '0' : '3rem',
          height: '3rem',
          opacity: isSearchOpen ? 0 : 1,
          transform: isSearchOpen ? 'scale(0)' : 'scale(1)',
          overflow: 'hidden'
        }"
      >
        <i class="fa-solid fa-magnifying-glass" style="color: #FDCD1F;"></i>
      </button>
    </div>
  </div>
</template>

<style scoped>
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.8);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.fade-in {
  animation: fadeIn 0.3s ease-in-out;
}

.search-input::placeholder {
  color: rgba(255, 255, 255, 0.6);
}

.search-input:focus {
  outline: none;
}
</style>