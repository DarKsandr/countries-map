<script setup lang="ts">
import {useTemplateRef} from "vue";

const modal = useTemplateRef('base-modal');

defineExpose({modal});
</script>

<template>
  <div class="modal fade" ref="base-modal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <slot name="header" />
        </div>
        <div class="modal-body">
          <slot />
        </div>
        <div class="modal-footer">
          <slot name="footer" />
        </div>
      </div>
    </div>
  </div>
</template>