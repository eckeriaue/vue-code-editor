<script  lang="ts">
  import { ref, unref, computed, defineComponent, reactive } from 'vue'
  import { Codemirror } from 'vue-codemirror'

  import PlayBtn from './components/play-icon'
  import langMap from './helpers/languages'
  
  export default defineComponent({
    components: {Codemirror, PlayBtn},
    setup() {

      const editor = {
        styles: reactive({
          width: '50%',
        })
      }
      const preview = {
        styles: {
          width: computed(() => window.innerWidth - parseFloat(editor.styles.width.replace('%', ''))+'px' ),
        }
      }


      const resize = {
        handlers: {
          move: [] as Function[],
          end: [] as Function[],
          start: [] as Function[],
        },
        resized: ref(false),
        currentEvent: null as MouseEvent | null,
        move(event: MouseEvent) {
          if (resize.currentEvent === null) return
          // @ts-ignore
          const diff = (resize.currentEvent?.target as HTMLElement).parentElement?.offsetWidth / 2
          editor.styles.width = event.clientX-diff+'px'
          resize.handlers.move.forEach(func => func())
        },
        end() {
          document.body.classList.remove('cursor-e-resize')
          window.removeEventListener('mousemove', resize.move)
          window.removeEventListener('mouseup', resize.end)
          resize.resized.value = false
          resize.handlers.end.forEach(func => func())
        },
        start(event: MouseEvent) {
          this.resized.value = true
          this.currentEvent = event
          document.body.classList.add('cursor-e-resize')
          window.addEventListener('mousemove', resize.move)
          window.addEventListener('mouseup', resize.end)
          resize.handlers.start.forEach(func => func())
        }
      }


      const compiledCodeResult = computed(() => `
        <!DOCTYPE html>
        <html>
          <head>
            ${document.head.innerHTML}
            <style>
              ${unref(langMap.css.code)}
            </style>
          </head>
          <body>
            ${unref(langMap.html.code)}
            <scr`+`ipt>try {${unref(langMap.js.code)}}catch(e) {}</sc`+`ript>
          </body>
        </html>
        `.replaceAll('\n', '')
        .trim()
      )

      const srcdoc = ref(unref(compiledCodeResult))
      return {
        langMap,
        editor,
        preview,
        resize,
        complile() {
          srcdoc.value = unref(compiledCodeResult)
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