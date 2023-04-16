import { onUnmounted, watch, unref } from 'vue'
import ls from './ls'

export default () => {

  const watchers = [];
  const langs = ['html', 'css', 'js']

  langs.forEach(lang => {
    const savedLangCode = localStorage.getItem(lang)
    ls[lang].code.value ||= savedLangCode
  })
  langs.forEach(lang => watchers.push(
    watch(
      unref(ls[lang].code),
      code => localStorage.setItem(lang, code)
    )
  ))

  onUnmounted(() => {
    watchers.forEach(unwatch => unwatch())
  })
}