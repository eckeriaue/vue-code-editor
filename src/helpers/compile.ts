import ls from './ls'
import {unref, computed} from 'vue'

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
      ${document.head.innerHTML}
      <style>
        ${unref(cssReset)}
        ${unref(ls.css.code)}
      </style>
    </head>
    <body>
      ${unref(ls.html.code)}
      <scr`+`ipt>try {${unref(ls.js.code)}}catch(e) {}</sc`+`ript>
    </body>
  </html>
  `.replaceAll('\n', '')
  .trim()

  return code
})