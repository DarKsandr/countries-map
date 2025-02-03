<script setup lang="ts">
import Header from "./components/Header.vue";
import Map from "./components/Map.vue";
import {ref} from "vue";
import type CountryItem from "./interfaces/CountryItem.ts";
import {useAppStore} from "./stores/appStore.ts";
import ModalInfo from "./components/ModalInfo.vue";
import { modal } from "./utils.ts";

const store = useAppStore();

const countryEnter = ref<CountryItem|null>(null);
</script>

<template>
    <div class="container-fluid">
      <Header
          :country-enter="countryEnter"
      />
      <Map
          v-if="store.country"
          class="mt-3 position-relative overflow-hidden vh-100"
          :key="store.country.code"
          @country-enter="countryEnter = $event"
          @collected="modal($refs['modal-collected'])"
          @not-collected="modal($refs['modal-not-collected'])"
      />
      <ModalInfo title="Поздравляем!" ref="modal-collected">
        Карта собрана
      </ModalInfo>

      <ModalInfo title="Ошибка!" ref="modal-not-collected">
        Карта собрана не верно
      </ModalInfo>
    </div>
</template>