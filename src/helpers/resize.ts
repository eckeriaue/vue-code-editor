import {ref} from 'vue'

const resize = () => {
  const resizer = {
    handlers: {
      move: [] as {pid: number, run: Function}[],
      end: [] as {pid: number, run: Function}[],
      start: [] as {pid: number, run: Function}[],
    },
    resized: ref(false),
    currentEvent: null as MouseEvent | null,

    on(handlerName: 'move' | 'end' | 'start', handle: (options: any) => any) {
      this.handlers[handlerName].push({pid: Date.now(), run: handle})
    },

    move(event: MouseEvent) {
      if (resizer.currentEvent === null) return
      // todo: нормально высчитать diff
      // const diff = (resizer.currentEvent?.target as HTMLElement).parentElement?.offsetWidth / 2
      const diffX = 0
      resizer.handlers.move.forEach(handler => handler.run({currentEvent: resizer.currentEvent, diffX, event, traceX: event.clientX+diffX}))
    },

    end() {
      document.body.classList.remove('cursor-e-resize')
      window.removeEventListener('mousemove', resizer.move)
      window.removeEventListener('mouseup', resizer.end)
      resizer.resized.value = false
      resizer.handlers.end.forEach(handler => handler.run())
    },

    start(event: MouseEvent) {
      this.resized.value = true
      this.currentEvent = event
      document.body.classList.add('cursor-e-resize')
      window.addEventListener('mousemove', resizer.move)
      window.addEventListener('mouseup', resizer.end)
      resizer.handlers.start.forEach(handler => handler.run())
    }
  }
  return resizer
}

export default resize