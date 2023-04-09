import {ref} from 'vue'

import { javascript } from '@codemirror/lang-javascript'
import { oneDark } from '@codemirror/theme-one-dark'
import { html as htmlLang } from '@codemirror/lang-html'
import {css} from '@codemirror/lang-css'

export default {
  html: {
    code: ref(''),
    extensions: [htmlLang(), oneDark],
  },
  js: {
    code: ref(''),
    extensions: [javascript(), oneDark],
  },
  css: {
    code: ref(''),
    extensions: [css(), oneDark],
  },
}
