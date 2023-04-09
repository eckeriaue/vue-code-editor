import {ref} from 'vue'

const resize = {
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
    if (resize.currentEvent === null) return
    const diff = (resize.currentEvent?.target as HTMLElement).parentElement?.offsetWidth / 2
    resize.handlers.move.forEach(func => func.run({currentEvent: resize.currentEvent, diff, event}))
  },
  end() {
    document.body.classList.remove('cursor-e-resize')
    window.removeEventListener('mousemove', resize.move)
    window.removeEventListener('mouseup', resize.end)
    resize.resized.value = false
    resize.handlers.end.forEach(func => func.run())
  },
  start(event: MouseEvent) {
    this.resized.value = true
    this.currentEvent = event
    document.body.classList.add('cursor-e-resize')
    window.addEventListener('mousemove', resize.move)
    window.addEventListener('mouseup', resize.end)
    resize.handlers.start.forEach(func => func.run())
  }
}

export default resize