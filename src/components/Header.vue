<script setup lang="ts">
  import Countries from "../countries";

  const model = defineModel();
</script>

<template>
  <div class="d-flex justify-content-between py-4">
    <div>
      <select v-model="model" class="form-select">
        <option v-for="item in Countries" :key="item.code" :value="item.code">{{item.name}}</option>
      </select>
    </div>
    <div class="btn-group">
      <button class="btn btn-primary">Собрать</button>
      <button class="btn btn-secondary">Размешать</button>
    </div>
  </div>
</template>

<style scoped>

</style>