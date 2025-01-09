<script setup lang="ts">
  import Countries from "../countries";
  import type CountryItem from "../interfaces/CountryItem.ts";

  const model = defineModel();
  const rate = defineModel('rate');
  defineProps<{
    countryEnter: CountryItem|null
  }>()

  function changeRate(e: Event) {
    const target = <HTMLInputElement>e.target;
    const value = +target.value
    rate.value = value ? value : 2;
  }
</script>

<template>
  <div class="d-flex justify-content-between py-4 ">
    <div>
      <select v-model="model" class="form-select">
        <option v-for="item in Countries" :key="item.code" :value="item.code">{{item.name}}</option>
      </select>
    </div>

    <div v-if="countryEnter" class="h4">{{countryEnter.name}}</div>

    <div class="d-flex gap-3">
      <div>
        <input type="number" class="form-control" placeholder="Масштаб" @change="changeRate($event)" :value="rate" min="1" max="4" />
      </div>
      <div class="btn-group">
        <button class="btn btn-primary">Собрать</button>
        <button class="btn btn-secondary">Размешать</button>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>