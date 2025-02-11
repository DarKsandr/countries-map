<script setup lang="ts">
  import {computed, ref, watch} from "vue";
import TimerEnum from "../enums/TimerEnum";

  const status = defineModel();

  const timer = ref(0);
  let timerId: any = null;

  watch(status, (newStatus) => {
    if(newStatus === TimerEnum.START && timerId === null){
      timerId = setInterval(() => {
        if(status.value !== TimerEnum.PAUSE){
          timer.value++;
        }
      }, 1000);
    }
    if(newStatus === TimerEnum.STOP){
      if(timerId){
        clearInterval(timerId);
        timerId = null;
      }
      timer.value = 0;
    }
  });

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