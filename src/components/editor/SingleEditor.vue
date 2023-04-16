<script setup lang="ts">
  import ls from '../../helpers/ls'
  import config from '../../helpers/config'
  import { Codemirror } from 'vue-codemirror'


  const props = defineProps<{
    lang: 'html' | 'css' | 'js'
  }>()
</script>

<template>
  <div class="max-h-screen overflow-auto">
    <Codemirror
      :tab-size="config.tabsize"
      :extensions="ls[props.lang].extensions"
      v-model="ls[props.lang].code.value"
    />
  </div>
</template>