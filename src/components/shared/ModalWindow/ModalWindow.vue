<script setup lang="ts">

  interface iProps {
    title: string
  }
  const props = defineProps<iProps>()
</script>

<template>
  <label for="chose-mode-popup" class="btn-sm btn" v-if="props.title" v-text="props.title" />

  <Teleport to="#app">
    <input type="checkbox" id="chose-mode-popup" class="modal-toggle" />
    <div class="modal modal-bottom sm:modal-middle">
      <div class="modal-box min-w-fit">
        <label for="chose-mode-popup" class="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
        <slot :id="'chose-mode-popup'"></slot>
        <!-- <div class="modal-action">
          <label for="chose-mode-popup" class="btn btn-xs">ok</label>
        </div> -->
      </div>
    </div>
  </Teleport>

</template>