<script setup lang="ts">
  import type Country from "../interfaces/Country.ts";
  import InlineSvg from 'vue-inline-svg';
  import type CountryItem from "../interfaces/CountryItem.ts";
  import interact from 'interactjs';

  defineProps<{
    country: Country;
    zoom: number;
  }>();

  const emit = defineEmits<{
    countryEnter: [item: CountryItem|null]
  }>();

  const setIndex = (target: HTMLElement, index: string) => {
    target.style.zIndex = index;
  }

  interact('.map-item').draggable({
    listeners: {
      move (event) {
        const position = { 
          x: +event.target.style.left.replace('px', ''), 
          y: +event.target.style.top.replace('px', ''),
        };

        position.x += event.dx;
        position.y += event.dy;

        const target = event.target;

        target.style.top = `${position.y}px`;
        target.style.left = `${position.x}px`;
        setIndex(target, '2');
      },
      end(event){
        setIndex(event.target, '1');
      }
    },
    modifiers: [
      interact.modifiers.restrictRect({
        restriction: 'parent' 
      })
    ]
  });
</script>

<template>
  <div class="map-container">
    <InlineSvg
        v-for="item in country.items"
        class="map-item"
        :style="{top: `${item.coordinate.y * zoom}px`, left: `${item.coordinate.x * zoom}px`}"
        :src="item.image"
        :width="item.width * zoom"
        :height="item.height * zoom"
        @mouseenter="emit('countryEnter', item)"
        @mouseleave="emit('countryEnter', null)"
    />
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