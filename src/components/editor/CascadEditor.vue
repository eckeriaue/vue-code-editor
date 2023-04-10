<script setup lang="ts">
  import ls from '../../helpers/ls'
  import { Codemirror } from 'vue-codemirror'
</script>

<template>
  <div v-for="(lang, name, i) in ls" :style="{height: `${100 / Object.keys(ls).length}%`}" class="border-dashed border max-h-full border-collapse overflow-auto border-stone-700" :key="name">
  <h2 class="bg-gray-800 sticky top-0 z-[1] text-xl font-medium p-2" v-text="name" />
    <Codemirror
      :extensions="lang.extensions"
      v-model="lang.code.value"
    />
  </div>
</template>