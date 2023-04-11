<script  lang="ts">

  // todo: сделать вариации редактора
  // сделать компиляцию только скриптов, html и css компилировать сразу
  import { ref, unref, computed, defineComponent, reactive } from 'vue'
  import config from './helpers/config'
  import langMap from './helpers/ls'
  import editor from './helpers/editor'
  import preview from './helpers/preview'
  import compileCode from './helpers/compile'
  import resize from './helpers/resize'
  import IframePreview from './components/preview/IframePreview.vue'
  import {EditorTools, SelectEditor, CascadEditor} from './components/editor'
  

  export default defineComponent({
    components: { EditorTools, CascadEditor, IframePreview },
    setup() {
      const resizer = resize()

      resizer.on('move', ({traceX }) => {
        editor.styles.width = traceX+'px'
      })

      const srcdoc = ref(localStorage.getItem('compileCode') ?? unref(compileCode))
      return {
        langMap,
        editor,
        preview,
        resizer,
        srcdoc,
        config,
        castling: () => config.switched = !config.switched,
        complile: async () => srcdoc.value = unref(compileCode),
        unref,
      }
    }
  })
</script>

<template>
  <div :data-theme="config.theme" class="flex overflow-hidden w-screen h-screen" :class="$style.container">

    <div :class="$style.leftSide" class="flex flex-col relative overflow-hidden">
      <editor-tools @play="complile"  />
      <cascad-editor />
      <div @mousedown="resizer.start($event)" :class="$style.resizer" />
    </div>

    <iframe-preview :class="$style.rightSide" :srcdoc="srcdoc" />

  </div>
</template>


<style module>
.container {
  --right-side-width: v-bind('unref(preview.styles.width)');
  --left-side-width: v-bind('editor.styles.width');
}

.leftSide  { width: var(--left-side-width) }
.rightSide { width: var(--right-side-width) }

.resizer {
  @apply block
  absolute z-[1]
  top-0 right-0
  h-full w-1
  bg-green-900
  hover:bg-green-500
  active:bg-green-500
  hover:cursor-e-resize
}
</style>

<style>
  @tailwind base;
  @tailwind components;
  @tailwind utilities;

  .cm-editor {
    background-color: hsla(var(--b1) / var(--tw-bg-opacity, 1));
  }
</style>

