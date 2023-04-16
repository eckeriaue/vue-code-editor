<script setup lang="ts">
  import { ref, unref } from 'vue'
  interface iProps {
    title: string
  }
  const props = defineProps<iProps>()


  const open = ref(false)
</script>

<template>
  <button for="chose-mode-popup" class="btn-sm btn" @click="open = !open" v-if="props.title" v-text="props.title" />

  <Teleport to="#app">
    <div v-if="open" class="modal fixed  modal-bottom sm:modal-middle visible pointer-events-auto opacity-100" @click="open = false">
      <div class="modal-box min-w-fit" @click.stop>
        
      <label @click="open = false" class="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
        <slot :toggle="() => open = !open"></slot>
      </div>
    </div>
  </Teleport>

</template>