<script setup lang="ts">
import Header from "./components/Header.vue";
import Map from "./components/Map.vue";
import {computed, ref} from "vue";
import Countries from "./countries";

const countryCode = ref(null);
const country = computed(() => countryCode.value
    ? Countries.find(item => item.code === countryCode.value)
    : null
);
</script>

<template>
    <div class="container">
      <div class="row">
        <Header v-model="countryCode" />
      </div>
      <div class="row">
        <Map v-if="country" :country="country" />
      </div>
    </div>
</template>