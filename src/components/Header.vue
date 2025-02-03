<script setup lang="ts">
  import Countries from "../countries";
  import type CountryItem from "../interfaces/CountryItem.ts";
  import type Language from "../interfaces/Language.ts";
  import {useAppStore} from "../stores/appStore.ts";
  import ModalConfirm from "./ModalConfirm.vue";
  import {confirmModal} from "../utils.ts";
  import ZoomInput from "./ZoomInput.vue";

  const store = useAppStore();

  defineProps<{
    countryEnter: CountryItem|null
  }>()
</script>

<template>
  <div class="row sticky-top bg-white border-bottom border-2 pt-4 pb-lg-4 gap-3 gap-lg-0">
    <div class="col-lg-2 col-md-12">
      <select v-model="store.code" class="form-select" @change="store.changeZoom">
        <option v-for="item in Countries" :key="item.code" :value="item.code">
          {{item.name[store.language as keyof Language]}}
        </option>
      </select>
    </div>

    <div class="h4 col-7 d-none d-lg-flex justify-content-center align-items-center">
      <div v-if="countryEnter">{{countryEnter.name[store.language as keyof Language]}}</div>
    </div>

    <div class="d-flex gap-3 col-lg-3 col-md-12">
      <zoom-input />
<!--      <select v-model="store.language">-->
<!--        <option value="ru">Русский</option>-->
<!--        <option value="en">English</option>-->
<!--      </select>-->
      <div class="btn-group">
        <button class="btn btn-primary" @click="confirmModal($refs['collect-modal'])">Собрать</button>
        <button class="btn btn-danger" @click="confirmModal($refs['shuffle-modal'])">Размешать</button>
        <button class="btn btn-success" @click="store.check = true">Проверить</button>
      </div>
    </div>

    <div class="h4 col-12 d-flex d-sm-none justify-content-center align-items-center">
      <div v-if="countryEnter">{{countryEnter.name[store.language as keyof Language]}}</div>
    </div>
  </div>

  <modal-confirm title="Вы уверены?" ref="shuffle-modal" @confirm="store.shuffle = true">
    Размешать карту
  </modal-confirm>

  <modal-confirm title="Вы уверены?" ref="collect-modal" @confirm="store.collect = true">
    Собрать карту
  </modal-confirm>
</template>

<style scoped>

</style>