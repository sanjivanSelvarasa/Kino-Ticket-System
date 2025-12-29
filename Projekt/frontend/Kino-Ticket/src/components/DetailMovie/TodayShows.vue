<script lang="ts" setup>
  const props = defineProps<{
    title: string,
    image: string,
    todayShow: string[]
  }>()
</script>

<template>
  <div class="w-[300px] aspect-[4/3]">
    <div></div>
    <div>
      <h3>{{ props.title }}</h3>
      <div class="">
        <span v-for="item in todayShow">{{item}}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>