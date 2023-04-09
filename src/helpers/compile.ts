import ls from './ls'
import {unref, computed} from 'vue'


export default computed(() => `
<!DOCTYPE html>
<html>
  <head>
    ${document.head.innerHTML}
    <style>
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
)