<script lang="ts" setup>
  const links = new Map<string, string>([
      ["Home", "/"],
      ["Filme", "/movie"],
      ["Programm", "/"],
      ["Login", "/login"],
  ])
</script>

<template>
  <div id="header" style="font-family: var(--font-family-base), 'Droid Sans'; background-color: var(--color-primary)" class="fixed top-0 left-0 flex items-center justify-between w-full px-10 py-6 text-black z-50">
    <div class="">
      <div class="flex justify-between align-middle w-30 h-10">
        <img src="#" alt="logo">
      </div>
    </div>
    <div class="flex flex-row w-lg ">
      <RouterLink v-for="[key, value] in links" class="btn-anim flex items-center justify-center w-[300px] font-normal overflow-hidden py-3 px-4 mx-2 border-0 border-[var(--color-secondary)] whitespace-nowrap" :to="value">
        <svg>
          <rect x="0" y="0" width="100%" height="100%" />
        </svg>
        {{ key }}
      </RouterLink>
    </div>
    <div class="flex gap-2">
      <RouterLink to="/" style="border-color: var(--color-secondary);" class="border-2 rounded-full py-3 px-4"><i class="fa-solid fa-magnifying-glass"></i></RouterLink>
      <RouterLink to="/" style="background: var(--color-secondary); color: var(--color-secondary-text)" class="py-3 px-6 rounded-full text-base font-semibold">Tickets Kaufen</RouterLink>
    </div>
  </div>
</template>

<style scoped>

.btn-anim {
  position: relative;
  transition: background 0.35s linear, letter-spacing 0.35s;
}

.btn-anim svg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}

.btn-anim rect {
  fill: none;
  stroke: var(--color-primary-text);
  stroke-width: 2;
  stroke-dasharray: 422, 0;
  transition: all 0.35s linear;
}

.btn-anim:hover {
  background: transparent;
  font-weight: 700;
  letter-spacing: 1px;
}

.btn-anim:hover rect {
  stroke-width: 5;
  stroke-dasharray: 15, 310;
  stroke-dashoffset: 48;
  transition: all 1.35s cubic-bezier(0.19, 1, 0.22, 1);
}
</style>