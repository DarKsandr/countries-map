<script setup lang="ts">
  import type Country from "../interfaces/Country.ts";
  import InlineSvg from 'vue-inline-svg';
  import type CountryItem from "../interfaces/CountryItem.ts";
  import interact from 'interactjs';
  import {onMounted, ref, useTemplateRef, watch} from "vue";
  import {deepClone, randomInteger} from "../utils.ts";

  const props = defineProps<{
    country: Country;
    zoom: number;
  }>();

  const emit = defineEmits<{
    countryEnter: [item: CountryItem|null]
  }>();

  const shuffle = defineModel('shuffle');
  const collect = defineModel('collect');

  const mapContainer = useTemplateRef('map-container');
  const data = ref();
  const dataSave = ref();

  const findItem = (target: HTMLElement) => {
    const code = target.dataset.code;
    return data.value.items.find(item => item.code === code);
  }

  interact('.map-item').draggable({
    listeners: {
      move (event) {
        const item = findItem(event.target);
        if(item){
          item.coordinate.x += event.dx / props.zoom;
          item.coordinate.y += event.dy / props.zoom;
          item.zIndex = 2;
        }
      },
      end(event){
        const item = findItem(event.target);
        if(item){
          item.zIndex = 1;
        }
      }
    },
    modifiers: [
      interact.modifiers.restrictRect({
        restriction: 'parent' 
      })
    ]
  });

  const init = () => {
    const res: Country = deepClone(props.country);

    res.items.forEach(item => {
      item.coordinate.y += 10;
    });
    data.value = deepClone(res);
    dataSave.value = deepClone(res);
  }

  onMounted(init);

  watch(shuffle, value => {
    if(value){
      shuffle.value = false;
      const localData: Country = Object.assign(data.value);
      const box = (mapContainer.value as HTMLElement).getBoundingClientRect();
      const proc = 0.4;
      localData.items.forEach(item => {
        const x = randomInteger(0, box.width - (item.width * props.zoom) - (box.width * proc));
        const y = randomInteger(0, box.height - (item.height * props.zoom) - (box.height * proc));
        item.coordinate.x = x > 0 ? x / props.zoom : 0;
        item.coordinate.y = y > 0 ? y / props.zoom : 0;
      });
      data.value = Object.assign(localData);
    }
  });

  watch(collect, (value) => {
    if(value){
      collect.value = false;
      data.value = deepClone(dataSave.value);
    }
  })
</script>

<template>
  <div class="map-container" ref="map-container">
    <template v-if="data?.items">
      <InlineSvg
          v-for="item in data.items"
          class="map-item"
          :style="{top: `${item.coordinate.y * zoom}px`, left: `${item.coordinate.x * zoom}px`, 'z-index': item.zIndex}"
          :src="item.image"
          :width="item.width * zoom"
          :height="item.height * zoom"
          :data-code="item.code"
          @mouseenter="emit('countryEnter', item)"
          @mouseleave="emit('countryEnter', null)"
      />
    </template>
  </div>
</template>

<style scoped>
  .map-container {
    background: rgba(151, 144, 238, 0.1);
  }
  .map-item {
    position: absolute;
    z-index: 1;
  }
</style>