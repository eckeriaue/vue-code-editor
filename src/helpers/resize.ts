import {ref} from 'vue'

//todo!
// export default {
//   handlers: {
//     move: [] as Function[],
//     end: [] as Function[],
//     start: [] as Function[],
//   },
//   resized: ref(false),
//   currentEvent: null as MouseEvent | null,
//   move(event: MouseEvent) {
//     if (resize.currentEvent === null) return
//     // @ts-ignore
//     const diff = (resize.currentEvent?.target as HTMLElement).parentElement?.offsetWidth / 2
//     editor.styles.width = event.clientX-diff+'px'
//     resize.handlers.move.forEach(func => func())
//   },
//   end() {
//     document.body.classList.remove('cursor-e-resize')
//     window.removeEventListener('mousemove', resize.move)
//     window.removeEventListener('mouseup', resize.end)
//     resize.resized.value = false
//     resize.handlers.end.forEach(func => func())
//   },
//   start(event: MouseEvent) {
//     this.resized.value = true
//     this.currentEvent = event
//     document.body.classList.add('cursor-e-resize')
//     window.addEventListener('mousemove', resize.move)
//     window.addEventListener('mouseup', resize.end)
//     resize.handlers.start.forEach(func => func())
//   }
// }