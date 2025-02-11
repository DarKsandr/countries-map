<script setup lang="ts">
  import Countries from "../countries";
  import type CountryItem from "../interfaces/CountryItem.ts";
  import type Language from "../interfaces/Language.ts";
  import {useAppStore} from "../stores/appStore.ts";
  import ModalConfirm from "./ModalConfirm.vue";
  import {modal} from "../utils.ts";
  import ZoomInput from "./ZoomInput.vue";
  import {computed, ref, useTemplateRef} from "vue";
  import Timer from "./Timer.vue";
  import RoundInput from "./RoundInput.vue";
  import language from "../language.ts";
  import { useI18n } from 'vue-i18n'
  import TimerEnum from "../enums/TimerEnum.ts";

  const { locale } = useI18n({ useScope: 'global' });

  const store = useAppStore();

  const timer = ref(TimerEnum.STOP);

  defineProps<{
    countryEnter: CountryItem|null
  }>();

  const isDisabled = computed(() => !store.country);
  const isStart = computed(() => timer.value === TimerEnum.START);
  const isPause = computed(() => timer.value === TimerEnum.PAUSE);
  const isStartOrPause = computed(() => isStart.value || isPause.value);
  const isDisabledSystem = computed(() => isDisabled.value || isStart.value || isPause.value);

  const startModal = useTemplateRef('start-modal');

  function start(){
    store.shuffle = true;
    timer.value = TimerEnum.START;
    store.isMove = true;
  }

  function startCheck(){
    if(timer.value === TimerEnum.PAUSE){
      timer.value = TimerEnum.START;
    } else {
      modal(startModal.value);
    }
  }

  function pause(){
    timer.value = TimerEnum.PAUSE;
    store.isMove = false;
  }

  function stop(){
    timer.value = TimerEnum.STOP;
    store.isMove = true;
  }

  function changeLanguage(e: Event){
    const target = e.target as HTMLSelectElement;
    locale.value = target.value;
  }
</script>

<template>
  <div class="row sticky-top bg-white border-bottom border-2 pt-4 pb-lg-4 gap-3 gap-lg-0 align-items-center">
    <div class="col-lg-2 col-md-12">
      <div class="form-floating">
        <select v-model="store.code" class="form-select" @change="store.changeZoom" id="countrySelect" :aria-label="$t('header.country')" :disabled="isStartOrPause">
          <option v-for="item in Countries" :key="item.code" :value="item.code">
            {{item.name[store.language as keyof Language]}}
          </option>
        </select>
        <label for="countrySelect">{{ $t('header.country') }}</label>
      </div>
    </div>

    <div class="h4 col-lg-4 d-none d-lg-flex justify-content-center align-items-center country-enter">
      <div v-if="countryEnter">{{countryEnter.name[store.language as keyof Language]}}</div>
    </div>

    <div class="d-flex gap-3 col-lg-6 col-md-12 align-items-center">
      <div class="input-group">
        <div class="form-floating">
          <ZoomInput :disabled="isDisabled" id="ZoomInput" :placeholder="$t('header.scale')" />
          <label for="ZoomInput">{{ $t('header.scale') }}</label>
        </div>
        <div class="form-floating">
          <RoundInput :disabled="isDisabled || isStartOrPause" id="RoundInput" :placeholder="$t('header.help')" />
          <label for="RoundInput">{{ $t('header.help') }}</label>
        </div>
        <div class="form-floating">
          <select v-model="store.language" @change="changeLanguage" class="form-control" id="LanguageSelect" :aria-label="$t('header.language')">
            <option v-for="lang in language" :value="lang.code">{{ lang.name }}</option>
           </select>
          <label for="LanguageSelect">{{ $t('header.language') }}</label>
        </div>
      </div>
      <div class="btn-group">
        <button class="btn btn-primary" @click="store.collect = true" :disabled="isDisabledSystem">{{ $t('header.collect') }}</button>
        <button class="btn btn-dark" @click="store.shuffle = true" :disabled="isDisabledSystem">{{ $t('header.stir') }}</button>
        <button class="btn btn-warning" @click="store.check = true" :disabled="isDisabled">{{ $t('header.check') }}</button>
      </div>
      <div class="btn-group">
        <button class="btn btn-success" @click="startCheck" :disabled="isDisabled || isStart">
          <i class="bi bi-caret-right-fill"></i>
        </button>
        <button class="btn btn-warning" @click="pause" :disabled="isDisabled || !isStart">
          <i class="bi bi-pause-fill"></i>
        </button>
        <button class="btn btn-danger" @click="modal($refs['finish-modal'])" :disabled="isDisabled || !isStartOrPause">
          <i class="bi bi-stop-fill"></i>
        </button>
      </div>
      <Timer v-model="timer" />
    </div>

    <div class="h4 col-12 d-lg-none d-xl-none d-xl-flex justify-content-center align-items-center country-enter text-center">
      <div v-if="countryEnter">{{countryEnter.name[store.language as keyof Language]}}</div>
    </div>
  </div>

  <modal-confirm :title="$t('header.areYouSure')" ref="start-modal" @confirm="start">
    {{ $t('header.begin') }}
  </modal-confirm>

  <modal-confirm :title="$t('header.areYouSure')" ref="finish-modal" @confirm="stop">
    {{ $t('header.finish') }}
  </modal-confirm>
</template>

<style scoped>
  .country-enter{
    height: 50px;
  }
</style>