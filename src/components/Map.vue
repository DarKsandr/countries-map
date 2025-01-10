<script setup lang="ts">
  import type Country from "../interfaces/Country.ts";
  import InlineSvg from 'vue-inline-svg';
  import type CountryItem from "../interfaces/CountryItem.ts";

  defineProps<{
    country: Country;
    zoom: number;
  }>();

  const emit = defineEmits<{
    countryEnter: [item: CountryItem|null]
  }>();
</script>

<template>
  <div class="map-container">
    <InlineSvg
        v-for="item in country.items"
        class="map-item"
        :style="{top: `${item.coordinate.y * zoom}px`, left: `${item.coordinate.x * zoom}px`}"
        :src="item.image"
        :width="item.width * zoom"
        :height="item.height * zoom"
        @mouseenter="emit('countryEnter', item)"
        @mouseleave="emit('countryEnter', null)"
    />
  </div>
</template>

<style scoped>
  .map-container {
    background: rgba(151, 144, 238, 0.1);
  }
  .map-item {
    position: absolute;
  }
</style>