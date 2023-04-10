import {ref, type Ref} from 'vue'

import { javascript } from '@codemirror/lang-javascript'
import { oneDark } from '@codemirror/theme-one-dark'
import { html } from '@codemirror/lang-html'
import {css} from '@codemirror/lang-css'

export default {
  html: {
    code: ref(''),
    extensions: [html(), oneDark],
  },
  js: {
    code: ref(''),
    extensions: [javascript(), oneDark],
  },
  css: {
    code: ref(''),
    extensions: [css(), oneDark],
  },
} as {
  [lang in 'html' | 'js' | 'css']: {
    code: Ref<string>,
    extensions: any[]
  }
}

