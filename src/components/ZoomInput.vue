<script setup lang="ts">
  import {useAppStore} from "../stores/appStore.ts";

  const store = useAppStore();
  function changeZoom(e: Event) {
    const target = <HTMLInputElement>e.target;
    const value = +target.value
    store.zoom = value ? value : 2;
  }
</script>

<template>
  <input type="number" class="form-control" placeholder="Масштаб" @change="changeZoom" :value="store.zoom" min="1" max="10" />
</template>

<style scoped>

</style>