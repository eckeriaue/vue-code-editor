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
  <div class="flex overflow-hidden w-screen h-screen" :class="$style.container">

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

  :root {
    font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
    line-height: 1.5;
    font-weight: 400;

    color-scheme: light dark;
    color: rgba(255, 255, 255, 0.87);
    background-color: #242424;

    font-synthesis: none;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-text-size-adjust: 100%;
  }

  a {
    font-weight: 500;
    color: #646cff;
    text-decoration: inherit;
  }
  a:hover {
    color: #535bf2;
  }

  body {
  }

  h1 {
    font-size: 3.2em;
    line-height: 1.1;
  }

  button {
    border-radius: 8px;
    outline: 0px solid transparent;
    padding: 0.6em 1.2em;
    font-size: 1em;
    font-weight: 500;
    font-family: inherit;
    background-color: #1a1a1a;
    cursor: pointer;
    @apply transition-all
  }
  button:hover {
    outline: 2px solid theme('colors.green.700');
  }
  button:focus,
  button:focus-visible {
    outline: 4px auto -webkit-focus-ring-color;
  }

  .card {
    padding: 2em;
  }

  @media (prefers-color-scheme: light) {
    :root {
      color: #213547;
      background-color: #ffffff;
    }
    a:hover {
      color: #747bff;
    }
    button {
      background-color: #f9f9f9;
    }
  }
</style>

