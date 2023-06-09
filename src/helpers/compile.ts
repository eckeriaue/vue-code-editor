import ls from './ls'
import {unref, computed} from 'vue'
import config from './config'

const cssReset = computed(() => `* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}`)

export default computed(() => {
  const code = `
  <!DOCTYPE html>
  <html>
    <head>
      ${config.syncThemePreview ? document.head?.innerHTML : ''}
      <style>
        ${unref(cssReset)}
        ${unref(ls.css.code)}
      </style>
      ${config.CDN.map(cdn => `<script src="${cdn}" defer></script>`)}
    </head>
    <body>
      ${unref(ls.html.code)}
      <scr`+`ipt type="${config.script.type}">try {${unref(ls.js.code)}}catch(e) {}</sc`+`ript>
    </body>
  </html>
  `.replaceAll('\n', '')
  .trim()

  return code
})