<script setup lang="ts">
import ModalBase from "./ModalBase.vue";
import {useTemplateRef} from "vue";

defineProps<{
  title?: string
}>();

const modal = useTemplateRef('modal');

defineExpose({modal});

defineEmits(['confirm', 'cancel']);
</script>

<template>
  <modal-base ref="modal">
    <template #header>
      <h5 class="modal-title">{{ title }}</h5>
      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="$emit('cancel')"></button>
    </template>
    <template #default>
      <slot />
    </template>
    <template #footer>
      <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="$emit('cancel')">{{ $t('modal.confirm.cancel') }}</button>
      <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="$emit('confirm')">{{ $t('modal.confirm.confirm') }}</button>
    </template>
  </modal-base>
</template>