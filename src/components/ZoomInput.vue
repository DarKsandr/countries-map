<script setup lang="ts">
  import { ZOOM } from "../const.ts";
import {useAppStore} from "../stores/appStore.ts";

  const store = useAppStore();
  function changeZoom(e: Event) {
    const target = <HTMLInputElement>e.target;
    const value = +target.value
    store.zoom = value ? value : ZOOM;
  }
</script>

<template>
  <input type="number" class="form-control" @change="changeZoom" :value="store.zoom" min="0.5" max="10" step="0.1" />
</template>

<style scoped>

</style>