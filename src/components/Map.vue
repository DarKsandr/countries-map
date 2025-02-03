<script setup lang="ts">
  import type Country from "../interfaces/Country.ts";
  import InlineSvg from 'vue-inline-svg';
  import type CountryItem from "../interfaces/CountryItem.ts";
  import interact from 'interactjs';
  import {onMounted, ref, useTemplateRef, watch} from "vue";
  import {deepClone, randomInteger} from "../utils.ts";
  import {useAppStore} from "../stores/appStore.ts";

  const store = useAppStore();

  const emit = defineEmits<{
    countryEnter: [item: CountryItem|null]
  }>();

  const mapContainer = useTemplateRef('map-container');
  const data = ref();
  const dataSave = ref();

  const findItem = (target: HTMLElement) => {
    const code = target.dataset.code;
    return data.value.items.find(item => item.code === code);
  }

  interact('.map-item').draggable({
    listeners: {
      start(){
        data.value.items.forEach(item => {
          item.zIndex = 1;
        });
      },
      move (event) {
        const item = findItem(event.target);
        if(item){
          item.coordinate.x += event.dx / store.zoom;
          item.coordinate.y += event.dy / store.zoom;
          item.zIndex = 2;
        }
      },
    },
    modifiers: [
      interact.modifiers.restrictRect({
        restriction: 'parent' 
      })
    ]
  });

  const init = () => {
    const res: Country = deepClone(store.country);

    let min_x = null;
    let min_y = null;

    res.items.forEach(item => {
      if(min_x === null || min_x > item.coordinate.x){
        min_x = item.coordinate.x;
      }
      if(min_y === null || min_y > item.coordinate.y){
        min_y = item.coordinate.y;
      }
    });
    res.items.forEach(item => {
      item.coordinate.x -= min_x;
      item.coordinate.y -= min_y;
    });
    data.value = deepClone(res);
    dataSave.value = deepClone(res);
  }

  onMounted(init);

  watch(() => store.shuffle, value => {
    if(value){
      store.shuffle = false;
      const localData: Country = deepClone(data.value);
      const box = (mapContainer.value as HTMLElement).getBoundingClientRect();
      const proc = 0.2;
      localData.items.forEach(item => {
        const x = randomInteger(0, box.width - (item.width * store.zoom) - (box.width * proc));
        const y = randomInteger(0, box.height - (item.height * store.zoom) - (box.height * proc));
        item.coordinate.x = x > 0 ? x / store.zoom : 0;
        item.coordinate.y = y > 0 ? y / store.zoom : 0;
      });
      data.value = deepClone(localData);
    }
  });

  watch(() => store.collect, (value) => {
    if(value){
      store.collect = false;
      data.value = deepClone(dataSave.value);
    }
  });
</script>

<template>
  <div class="map-container" ref="map-container">
    <template v-if="data?.items">
      <InlineSvg
          v-for="item in data.items"
          class="map-item"
          :style="{top: `${item.coordinate.y * store.zoom}px`, left: `${item.coordinate.x * store.zoom}px`, 'z-index': item.zIndex}"
          :src="item.image"
          :width="item.width * store.zoom"
          :height="item.height * store.zoom"
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