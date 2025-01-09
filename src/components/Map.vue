<script setup lang="ts">
  import type Country from "../interfaces/Country.ts";
  import InlineSvg from 'vue-inline-svg';
  import type CountryItem from "../interfaces/CountryItem.ts";

  defineProps<{
    country: Country;
    rate: number;
  }>();

  const emit = defineEmits<{
    countryEnter: [item: CountryItem|null]
  }>();
</script>

<template>
  <div>
      <InlineSvg
          v-for="item in country.items"
          :src="item.image"
          :width="item.width * rate"
          :height="item.height * rate"
          @mouseenter="emit('countryEnter', item)"
          @mouseleave="emit('countryEnter', null)"
      />
  </div>
</template>

<style scoped>

</style>