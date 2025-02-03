<script setup lang="ts">
import {useTemplateRef} from "vue";

defineProps<{
  title?: string
}>();

const modal = useTemplateRef('modal');

defineExpose({modal});

defineEmits(['confirm', 'cancel']);
</script>

<template>
  <div class="modal fade" ref="modal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">{{ title }}</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="$emit('cancel')"></button>
        </div>
        <div class="modal-body">
          <slot />
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="$emit('cancel')">отмена</button>
          <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="$emit('confirm')">ок</button>
        </div>
      </div>
    </div>
  </div>
</template>