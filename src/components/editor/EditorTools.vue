<script setup lang="ts">

  import ls from '../../helpers/ls'
  import { ref, type Ref, unref} from 'vue'
  import ModalWindow from '../shared/ModalWindow/ModalWindow.vue'
  import EditorSettings from '../settings/EditorSettings.vue';
import config from '../../helpers/config';


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
      png: string
      filepath: Ref<'gif' | 'png'>
    }
  }
  const modes: Mode = {
    single: {
      gif: new URL('./modes-preview/gif/single.gif', import.meta.url).href,
      png: new URL('./modes-preview/img/single.png', import.meta.url).href,
      filepath: ref('png'),
    },
    cascad: {
      gif: new URL('./modes-preview/gif/cascad.gif', import.meta.url).href,
      png: new URL('./modes-preview/img/cascad.png', import.meta.url).href,
      filepath: ref('png'),
    },
  }

</script>

<template>
  <div class="flex justify-end gap-x-2 items-center px-3 py-2 relative z-[2]">
    
    <div class="mr-auto flex gap-x-2">
      <editor-settings />
      <div class="tabs tabs-boxed min-w-max" v-if="props.mode === 'single'">
        <button class="tab tab-sm font-medium transition-all" @click="emit('update:lang', name)" :class="{'tab-active': name === props.lang}" v-for="(lang, name, i) in ls" :key="name" v-text="name"  />
      </div>
    </div>

    <ModalWindow title="mode" #="{toggle}">
      <h3 v-text="'Режим ввода'" class="font-semibold" />

      <div class="flex h-64 btn-group mt-6">
        <label
          v-for="(mod, name) in modes"
          :key="name"
          :data-text="name"
          @click="emit('update:mode', name), toggle()"
          class="relative before:relative before:z-[1] overflow-hidden hover:before:opacity-0 hover:after:opacity-0 before:transition-all after:transition-all min-h-full w-1/2 lg:w-96 btn bg-cover bg-no-repeat before:content-[attr(data-text)] after:absolute after:top-0 after:left-0 after:w-full after:h-full after:bg-black after:opacity-50"
          @mouseenter="mod.filepath.value = 'gif'"
          @mouseleave="mod.filepath.value = 'png'"
          :style="{backgroundImage: `url('${mod[unref(mod.filepath)]}')`}"
        />
      </div>
    </ModalWindow>


    <button v-if="config.compile.mode !== 'instantly'" @click="emit('play')" :class="$style.play" class="tooltip btn-sm w-8 h-8 btn tooltip-left" data-tip="compile" />
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