<script  lang="ts">
  import { ref, unref, computed, defineComponent, reactive } from 'vue'
  import { Codemirror } from 'vue-codemirror'

  import langMap from './helpers/ls'
  import editor from './helpers/editor'
  import preview from './helpers/preview'
  import compileCode from './helpers/compile'
  import resize from './helpers/resize'
  
  export default defineComponent({
    components: {Codemirror, },
    setup() {


      resize.on('move', ({event, diff, currentEvent}) => {
        editor.styles.width = event.clientX-diff+'px'
      })

      const srcdoc = ref(unref(compileCode))
      return {
        langMap,
        editor,
        preview,
        resize,
        complile() {
          srcdoc.value = unref(compileCode)
        },
        srcdoc,
      }
    }
  })
</script>

<template>
  <div class="flex overflow-hidden w-screen h-screen">
    <form hidden name="contact" netlify>
      <p>
        <label>Name <input type="text" name="name" /></label>
      </p>
      <p>
        <label>Email <input type="email" name="email" /></label>
      </p>
      <p>
        <button type="submit">Send</button>
      </p>
    </form>
    <div :style="editor.styles" class="flex flex-col relative overflow-hidden">
      <div v-for="(lang, name, i) in langMap" :style="{height: `${100 / Object.keys(langMap).length}%`}" class="border-dashed border max-h-full border-collapse overflow-auto border-stone-700" :key="name">
        <h2 class="bg-gray-800 sticky top-0 z-[1] text-xl font-medium p-2" v-text="name" />
        <Codemirror
          :extensions="lang.extensions"
          v-model="lang.code.value"
        />
      </div>
    </div>

    <div class="relative">
      <div class="pr-1">
        <button @click="complile" :class="$style.play" />
      </div>
      <div @mousedown="resize.start($event)" class="block absolute top-0 right-0 h-full w-1 bg-green-900 hover:bg-green-500 active:bg-green-500 hover:cursor-e-resize" />
    </div>

    <div :style="{width: preview.styles.width.value}" class="h-screen border-dashed border border-collapse border-stone-700 p-2">
      <iframe :class="{'pointer-events-none': resize.resized.value}" width="100%" height="100%" :srcdoc="srcdoc" />
    </div>

  </div>
</template>

<style module>
.play {
  background-repeat: no-repeat;
  background-position: center;
  width: theme('width.12');
  height: theme('width.12');
  margin: theme('margin.2');
  background-size: 24px;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke-width='1.5' stroke='white'%3e%3cpath stroke-linecap='round' stroke-linejoin='round' d='M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z'%3e%3c/path%3e%3c/svg%3e");
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

