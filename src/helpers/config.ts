import { reactive } from "vue"


type EditorTimers = {
  [key in '1sec' | '3sec' | '5sec']: 
    key extends '1sec' ? 1000
    : key extends '3sec' ? 3000
    : key extends '5sec' ? 5000
    : void 
}

export const timers: EditorTimers = {
  '1sec': 1000,
  '3sec': 3000,
  '5sec': 5000,
}


type scriptTypes = 'text/javascript' | 'module' | 'x-shader/x-fragment'
export const scriptTypes: scriptTypes[] = ['text/javascript', 'module', 'x-shader/x-fragment']

export default reactive({
  theme: 'dark',
  compile: {
    mode: 'oncommand' as 'instantly' | 'oncommand' | keyof EditorTimers
  },
  script: {
    type: 'text/javascript' as scriptTypes
  }
})