<script setup lang="ts">
  import { ref } from 'vue'


  const props = defineProps<{
    title: string
  }>()
  const emit = defineEmits<{
    (e: 'toggle', isOpen: boolean): void
  }>()

  const open = ref(false)
</script>

<template>
  <div  @click="emit('toggle', (open = !open))" class="border border-base-300 bg-base-100 rounded-box">
  <div class="collapse-title text-xl font-medium cursor-pointer select-none flex justify-between items-center">
    {{ props.title }}
    <svg :class="{'rotate-180': open}" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="white" class="-mr-6 duration-300 transition-all w-5 h-5">
      <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
    </svg>
  </div>

  <Transition name="collapse">
    <div @click.stop class="collapse-content max-h-max pb-4" v-show="open">
      <slot></slot>
    </div>
  </Transition>
</div>
</template>

<style scoped>
    .collapse-enter-active,
    .collapse-leave-active {
      max-height: 999px;
      @apply transition-all duration-300
    }
    
    .collapse-enter-from,
    .collapse-leave-to {
      max-height: 0px;
      @apply transition-all duration-300
    }
</style>