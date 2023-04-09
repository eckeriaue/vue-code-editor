import editor from "./editor"
import { computed } from "vue"

export default {
  styles: {
    width: computed(() => window.innerWidth - parseFloat(editor.styles.width.replace('%', ''))+'px' ),
  }
}
