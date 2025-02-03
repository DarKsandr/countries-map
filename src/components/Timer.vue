<script setup lang="ts">
  import {computed, ref} from "vue";

  const timer = ref(0);
  let timerId;

  function init(value){
    timer.value = 0;
    if(value){
      timerId = setInterval(() => {
        timer.value++;
      }, 1000);
    } else {
      if(timerId){
        clearInterval(timerId);
      }
    }
  }

  init(true);

  const hour = computed(() => {
    const sec = timer.value;
    if(sec === 0){
      return `00`;
    }
    const hour = Math.floor(sec / 60 / 60);
    return hour < 10 ? `0` + hour : hour;
  });

  const minute = computed(() => {
    const sec = timer.value;
    if(sec === 0){
      return `00`;
    }
    const minute = Math.floor(sec / 60);
    return minute < 10 ? `0` + minute : minute;
  });

  const second = computed(() => {
    const sec = timer.value;
    if(sec === 0){
      return `00`;
    }

    const second = Math.floor(sec % 60);
    return second < 10 ? `0` + second : second;
  });
</script>

<template>
  <div>{{hour}}:{{minute}}:{{second}}</div>
</template>

<style scoped>

</style>