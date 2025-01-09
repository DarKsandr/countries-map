<script setup lang="ts">
  import type Country from "../interfaces/Country.ts";
  import InlineSvg from 'vue-inline-svg';

  defineProps<{
    country: Country;
  }>();
</script>

<template>
  <div>
      <InlineSvg v-for="item in country.items" :src="item.image" />
  </div>
</template>

<style scoped>

</style>