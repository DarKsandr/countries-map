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

const rate = ref(2);

const countryEnter = ref<CountryItem|null>(null);
</script>

<template>
    <div class="container">
      <div class="row sticky-top bg-white border-bottom border-2">
        <Header
            v-model="countryCode"
            v-model:rate="rate"
            :country-enter="countryEnter"
        />
      </div>
      <div class="row mt-3">
        <Map
            v-if="country"
            :country="country"
            :rate="rate"
            @country-enter="countryEnter = $event"
        />
      </div>
    </div>
</template>