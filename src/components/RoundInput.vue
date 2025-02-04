<script setup lang="ts">
  import {useAppStore} from "../stores/appStore.ts";

  const store = useAppStore();
  function changeRound(e: Event) {
    const target = <HTMLInputElement>e.target;
    store.round = +target.value;
  }
</script>

<template>
  <input type="number" class="form-control" placeholder="Помощь" @change="changeRound" :value="store.round" />
</template>

<style scoped>

</style>