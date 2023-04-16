<script setup lang="ts">
  import { ref } from 'vue'


  const props = defineProps<{
    title: string
  }>()
  const emit = defineEmits<{
    (e: 'open', isOpen: true): void
    (e: 'close', isOpen: false): void
  }>()

</script>

<template>
  <div tabindex="0" @focusin="emit('open', true)" @focusout="emit('close', false)" class="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box">
  <div class="collapse-title text-xl font-medium">
    {{ props.title }}
  </div>
  <div class="collapse-content">
    <slot></slot>
  </div>
</div>
</template>