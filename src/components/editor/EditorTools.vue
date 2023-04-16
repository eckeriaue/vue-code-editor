<script setup lang="ts">

  import ls from '../../helpers/ls'
  import { ref } from 'vue'
  import ModalWindow from '../shared/ModalWindow/ModalWindow.vue'


  interface iProps {
    lang: 'html' | 'css' | 'js',
    mode: 'cascad' | 'single'
  }

  const props = defineProps<iProps>()
  const emit = defineEmits<{
    (e: 'play'): void
    (e: 'fullscreen', set: boolean): void
    (e: 'update:lang', lang: iProps['lang']): void
    (e: 'update:mode', lang: iProps['mode']): void
  }>()


  type Mode = {
    [key in iProps['mode']]: {
      gif: string
    }
  }
  const modes: Mode = {
    single: {
      gif: new URL('./msedge_A7IyrC1I6f.gif', import.meta.url).href
    },
    cascad: {
      gif: new URL('./msedge_GYRZCuywzQ.gif', import.meta.url).href
    },
  }

</script>

<template>
  <div class="flex justify-end gap-x-2 items-center px-3 py-2 relative z-[2]">
    
    <div class="tabs tabs-boxed mr-auto min-w-max" v-if="props.mode === 'single'">
      <button class="tab tab-sm font-medium transition-all" @click="emit('update:lang', name)" :class="{'tab-active': name === props.lang}" v-for="(lang, name, i) in ls" :key="name" v-text="name"  />
    </div>

    <ModalWindow title="mode" #="{id}">
      <h3 v-text="'Режим ввода'" class="font-semibold" />

      <div class="flex h-64 btn-group mt-6">
        <label
          :for="id"
          v-for="(mod, name) in modes"
          :key="name"
          @click="emit('update:mode', name)"
          class="min-h-full w-1/2 btn"
          :style="{backgroundImage: `url('${mod.gif}')`}"
        />
      </div>
    </ModalWindow>


    <button @click="emit('play')" :class="$style.play" class="tooltip btn-sm w-8 h-8 btn tooltip-left" data-tip="compile" />
  </div>
</template>

<style module>
  .setting-button {
    background-repeat: no-repeat;
    background-position: center;
    background-size: 24px;
  }
  .play {
    composes: setting-button;
    background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke-width='1.5' stroke='white'%3e%3cpath stroke-linecap='round' stroke-linejoin='round' d='M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z'%3e%3c/path%3e%3c/svg%3e");
  }
</style>