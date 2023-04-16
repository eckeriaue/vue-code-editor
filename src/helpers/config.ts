import { reactive } from "vue"



export default reactive({
  theme: 'dark',
  compile: {
    mode: 'oncommand' as 'instantly' | 'oncommand'
  }
})