<script setup lang="ts">
  import Countries from "../countries";
  import type CountryItem from "../interfaces/CountryItem.ts";
  import type Language from "../interfaces/Language.ts";
  import {useAppStore} from "../stores/appStore.ts";
  import ModalConfirm from "./ModalConfirm.vue";
  import {modal} from "../utils.ts";
  import ZoomInput from "./ZoomInput.vue";
  import {computed} from "vue";
  import Timer from "./Timer.vue";
  import RoundInput from "./RoundInput.vue";

  const store = useAppStore();

  defineProps<{
    countryEnter: CountryItem|null
  }>();

  const isDisabled = computed(() => !store.country);
  const isDisabledSystem = computed(() => isDisabled.value || store.isStart);

  function start(){
    store.isStart = true;
    store.shuffle = true;
  }
</script>

<template>
  <div class="row sticky-top bg-white border-bottom border-2 pt-4 pb-lg-4 gap-3 gap-lg-0 align-items-center">
    <div class="col-lg-2 col-md-12">
      <select v-model="store.code" class="form-select" @change="store.changeZoom">
        <option v-for="item in Countries" :key="item.code" :value="item.code">
          {{item.name[store.language as keyof Language]}}
        </option>
      </select>
    </div>

    <div class="h4 col-lg-4 d-none d-lg-flex justify-content-center align-items-center country-enter">
      <div v-if="countryEnter">{{countryEnter.name[store.language as keyof Language]}}</div>
    </div>

    <div class="d-flex gap-3 col-lg-6 col-md-12 align-items-center">
      <ZoomInput :disabled="isDisabled" />
      <RoundInput :disabled="isDisabled" />
<!--      <select v-model="store.language">-->
<!--        <option value="ru">Русский</option>-->
<!--        <option value="en">English</option>-->
<!--      </select>-->
      <div class="btn-group">
        <button class="btn btn-primary" @click="store.collect = true" :disabled="isDisabledSystem">Собрать</button>
        <button class="btn btn-dark" @click="store.shuffle = true" :disabled="isDisabledSystem">Размешать</button>
        <button class="btn btn-warning" @click="store.check = true" :disabled="isDisabled">Проверить</button>
        <button class="btn btn-success" v-if="!store.isStart" @click="modal($refs['start-modal'])" :disabled="isDisabled">Старт</button>
        <button class="btn btn-danger" v-else @click="modal($refs['finish-modal'])" :disabled="isDisabled">Закончить</button>
      </div>
      <Timer v-if="store.isStart" />
    </div>

    <div class="h4 col-12 d-lg-none d-xl-none d-xl-flex justify-content-center align-items-center country-enter text-center">
      <div v-if="countryEnter">{{countryEnter.name[store.language as keyof Language]}}</div>
    </div>
  </div>

  <modal-confirm title="Вы уверены?" ref="start-modal" @confirm="start">
    Начать
  </modal-confirm>

  <modal-confirm title="Вы уверены?" ref="finish-modal" @confirm="store.isStart = false">
    Закончить
  </modal-confirm>
</template>

<style scoped>
  .country-enter{
    height: 50px;
  }
</style>