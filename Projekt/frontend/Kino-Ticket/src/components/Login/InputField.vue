<script lang="ts" setup>
  const props = defineProps<{
    inputName: string,
    inputType: string,
    label: string,
    placeholder: string,
  }>()
</script>

<template>
  <label :for="props.inputName" class="block text-xs mb-1 ml-1 uppercase text-[var(--color-secondary-text)]" >{{props.label}}</label>
  <input id="username" :type="props.inputType" :name="props.inputName" :placeholder="props.placeholder" required class="block px-4 py-3 w-full bg-white/5 border-white/10
 rounded-xl border-1 mb-4 text-sm">
</template>

<style></style>