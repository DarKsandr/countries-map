<script setup lang="ts">
  import Countries from "../countries";
  import type CountryItem from "../interfaces/CountryItem.ts";
  import type Language from "../interfaces/Language.ts";
  import {useAppStore} from "../stores/appStore.ts";
  import ModalConfirm from "./ModalConfirm.vue";
  import {confirmModal} from "../utils.ts";
  import ZoomInput from "./ZoomInput.vue";
  import {computed, useTemplateRef} from "vue";
  import Timer from "./Timer.vue";

  const store = useAppStore();

  defineProps<{
    countryEnter: CountryItem|null
  }>();

  const collectModal = useTemplateRef('collect-modal');
  function collect(){
    if(store.isStart){
      confirmModal(collectModal.value);
    } else {
      store.collect = true;
    }
  }

  const shuffleModal = useTemplateRef('shuffle-modal');
  function shuffle(){
    if(store.isStart){
      confirmModal(shuffleModal.value);
    } else {
      store.shuffle = true;
    }
  }

  const isDisabled = computed(() => !store.country);
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

    <div class="h4 col-lg-3 d-none d-lg-flex justify-content-center align-items-center country-enter">
      <div v-if="countryEnter">{{countryEnter.name[store.language as keyof Language]}}</div>
    </div>

    <div class="d-flex gap-3 col-lg-7 col-md-12 align-items-center">
      <zoom-input :disabled="isDisabled" />
<!--      <select v-model="store.language">-->
<!--        <option value="ru">Русский</option>-->
<!--        <option value="en">English</option>-->
<!--      </select>-->
      <div class="btn-group">
        <button class="btn btn-primary" @click="collect" :disabled="isDisabled">Собрать</button>
        <button class="btn btn-dark" @click="shuffle" :disabled="isDisabled">Размешать</button>
        <button class="btn btn-warning" @click="store.check = true" :disabled="isDisabled">Проверить</button>
        <button class="btn btn-success" v-if="!store.isStart" @click="confirmModal($refs['start-modal'])" :disabled="isDisabled">Старт</button>
        <button class="btn btn-danger" v-else @click="confirmModal($refs['finish-modal'])" :disabled="isDisabled">Закончить</button>
      </div>
      <timer v-if="store.isStart" />
    </div>

    <div class="h4 col-12 d-lg-none d-xl-none d-xl-flex justify-content-center align-items-center country-enter text-center">
      <div v-if="countryEnter">{{countryEnter.name[store.language as keyof Language]}}</div>
    </div>
  </div>

  <modal-confirm title="Вы уверены?" ref="shuffle-modal" @confirm="store.shuffle = true">
    Размешать карту
  </modal-confirm>

  <modal-confirm title="Вы уверены?" ref="collect-modal" @confirm="store.collect = true">
    Собрать карту
  </modal-confirm>

  <modal-confirm title="Вы уверены?" ref="start-modal" @confirm="store.isStart = true">
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