<script setup lang="ts">

  const props = defineProps<{
    srcdoc: string
  }>()
</script>

<template>
  
  <div  class="h-screen border-dashed border border-collapse border-stone-700 p-2">
    <iframe  width="100%" height="100%" :srcdoc="props.srcdoc" />
  </div>
</template>