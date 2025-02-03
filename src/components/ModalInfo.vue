<script setup lang="ts">
import ModalBase from "./ModalBase.vue";
import {useTemplateRef} from "vue";

defineProps<{
  title?: string
}>();

const modal = useTemplateRef('modal');

defineExpose({modal});
</script>

<template>
  <modal-base ref="modal">
    <template #header>
      <h5 class="modal-title">{{ title }}</h5>
      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
    </template>
    <template #default>
      <slot />
    </template>
  </modal-base>
</template>