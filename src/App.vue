<script  lang="ts">

  // todo: сделать вариации редактора
  // сделать компиляцию только скриптов, html и css компилировать сразу
  import { ref, unref, computed, defineComponent,  watch } from 'vue'
  import config, {timers} from './helpers/config'
  import langMap from './helpers/ls'
  import editor from './helpers/editor'
  import preview from './helpers/preview'
  import compileCode from './helpers/compile'
  import resize from './helpers/resize'
  import IframePreview from './components/preview/IframePreview.vue'
  import {EditorTools, SingleEditor, CascadEditor} from './components/editor'


  export default defineComponent({
    components: { EditorTools, IframePreview },
    setup() {
      const resizer = resize()

      resizer.on('move', ({traceX }) => {
        editor.styles.width = traceX+'px'
      })

      const srcdoc = ref(localStorage.getItem('compileCode') ?? unref(compileCode))

      const compile = async () => srcdoc.value = unref(compileCode)
      let timeout: number;
      watch([() => config.compile.mode, () => unref(compileCode)], ([mode, code]) => {

        if (timers[mode]) {
          if (typeof timeout === 'number') clearTimeout(timeout)
          timeout = setTimeout(compile, timers[mode])
        }
      })
      return {
        langMap,
        editor,
        preview,
        resizer,
        srcdoc: computed(() => config.compile.mode === 'instantly' ?  unref(compileCode) : unref(srcdoc)),
        compileCode,
        config,
        compile,
        unref,
        selectedLang: ref<'html' | 'js' | 'css'>('html'),
        editorName: {
          single: SingleEditor,
          cascad: CascadEditor
        },
        mode: ref<'cascad' | 'single'>('single')
      }
    }
  })
</script>

<template>
  <div :data-theme="config.theme" class="flex overflow-hidden w-screen h-screen" :class="$style.container">

    <div :class="$style.leftSide" class="flex flex-col relative overflow-hidden">
      <editor-tools
        v-model:lang="selectedLang"
        v-model:mode="mode"
        @play="compile"
      />

      <component :is="editorName[mode]" :lang="selectedLang" />
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

