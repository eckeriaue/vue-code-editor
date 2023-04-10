<script setup lang="ts">

  const emit = defineEmits<{
    (e: 'play'): void
    (e: 'fullscreen', set: boolean): void
  }>()

</script>

<template>
  <div class="flex justify-end gap-x-2 items-center m-2 pr-1">
    <button @click="emit('play')" :class="$style.play" />
  </div>
</template>

<style module>
  .setting-button {
    background-repeat: no-repeat;
    background-position: center;
    --size: 43px;
    width: var(--size);
    height: var(--size);
    max-width: var(--size);
    max-height: var(--size);
    min-width: var(--size);
    min-height: var(--size);
    background-size: 24px;
  }
  .play {
    composes: setting-button;
    background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke-width='1.5' stroke='white'%3e%3cpath stroke-linecap='round' stroke-linejoin='round' d='M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z'%3e%3c/path%3e%3c/svg%3e");
  }
</style>