<script setup lang="ts">
import Header from "./components/Header.vue";
import Map from "./components/Map.vue";
import {computed, ref} from "vue";
import Countries from "./countries";
import type CountryItem from "./interfaces/CountryItem.ts";

const countryCode = ref(null);
const country = computed(() => countryCode.value
    ? Countries.find(item => item.code === countryCode.value)
    : null
);

const zoom = ref(2);

const countryEnter = ref<CountryItem|null>(null);

const language = ref("ru");

const shuffle = ref(false);
const collect = ref(false);
</script>

<template>
    <div class="container-fluid">
      <Header
          v-model="countryCode"
          v-model:zoom="zoom"
          v-model:language="language"
          v-model:collect="collect"
          v-model:shuffle="shuffle"
          :country-enter="countryEnter"
      />
      <Map
          v-if="country"
          class="mt-3 position-relative overflow-hidden vh-100"
          :country="country"
          :zoom="zoom"
          @country-enter="countryEnter = $event"
          v-model:collect="collect"
          v-model:shuffle="shuffle"
      />
    </div>
</template>