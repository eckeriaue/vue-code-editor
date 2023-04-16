<script setup lang="ts">
  import { ref, unref, computed } from 'vue'
  import config, {scriptTypes, themes} from '../../helpers/config'
import Collapse from '../shared/Collapse.vue';

  const open = ref(false)
  const cdnAddlink = ref('')
  const disabledCdnAddButton = computed(() => unref(cdnAddlink) === '' || config.CDN.includes(unref(cdnAddlink)))
  const settings = {
    compile: {
      oncommand: 'по команде',
      instantly: 'моментально',
      '1sec': 'после 1 сек. покоя',
      '3sec': 'после 3 сек. покоя',
      '5sec': 'после 5 сек. покоя',
    }
  }


  function addlink() {
    if (unref(cdnAddlink) === '') return
    if (config.CDN.includes(unref(cdnAddlink))) {
      return
    }
    config.CDN.push(unref(cdnAddlink))
    cdnAddlink.value = ''
  }

  const removeCdnByIndex = (index: number) => config.CDN.splice(index, 1)

  function hideCdnIfVoid(i: number) {
    if (config.CDN[i] === '') {
      removeCdnByIndex(i)
    }
  }
</script>
<template>
  <button class="group btn-sm w-8 h-8 btn" @click="open = !open">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="group-hover:rotate-180 transition-all duration-500 w-6 h-6 min-w-[24px] min-h-[24px]" stroke-width="1.5" stroke="white" >
      <path stroke-linecap="round" stroke-linejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
      <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>

  <Teleport to="#app">
    <div v-if="open" class="modal fixed  modal-bottom sm:modal-middle visible pointer-events-auto opacity-100" @click="open = false">
      <div class="modal-box min-w-fit" @click.stop>
        <label @click="open = false" class="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
        <h3 v-text="'Настройки'" class="text-xl font-medium" />
        <menu>
          <!-- todo: выводить настройки автоматически -->

          <li class="flex w-full items-center justify-between mt-8">
            <span v-text="'тема'" class="font-medium" />
            <select v-model="config.theme" class="select w-72 select-sm select-bordered">
              <option v-for="(theme) in themes" :key="theme" :value="theme" v-text="theme" />
            </select>
          </li>

          <li class="flex w-full items-center justify-between mt-8">
            <span v-text="'режим компиляции'" class="font-medium" />
            <select v-model="config.compile.mode" :class="{'select-error': config.compile.mode === 'instantly'}" class="select w-72 select-sm select-bordered">
              <option v-for="(compileOption, name, i) in settings.compile" :key="compileOption" :value="name" v-text="compileOption" />
            </select>
          </li>

          <li class="flex w-full items-center justify-between mt-8">
            <span v-text="'размер табов'" class="font-medium" />
            <input autocomplete="off"  type="number" v-model.number="config.tabsize" class="w-72 input input-bordered input-sm" />
          </li>


          <li class="flex w-full justify-between mt-8">
            <span v-text="'CDN'"  />

            <div class="w-72 space-y-2">
              <TransitionGroup tag="menu" name="fade-slide"  class="w-full space-y-1">
                <li v-for="(_, i) in config.CDN" :key="config.CDN[i]" class="w-full transition-all input-group">
                  <input autocomplete="off"  type="text" v-model="config.CDN[i]" @input="hideCdnIfVoid(i)" placeholder="Ссылка на библиотеку" class="w-full input input-bordered input-sm" />
                  <button @click="removeCdnByIndex(i)" class="btn btn-outline btn-error btn-sm" v-text="'✕'" />
                </li>
              </TransitionGroup>
              <div class="input-group w-full">
                <input autocomplete="off" type="text" v-model="cdnAddlink" @keypress.enter="addlink" placeholder="Ссылка на библиотеку" class="input input-bordered input-sm" />
                <button :disabled="disabledCdnAddButton" class="btn btn-sm" @click="addlink" v-text="'добавить'" />
              </div>
            </div>
          </li>

        </menu>

        <menu class="mt-12">
          <li class="text-sm font-medium flex items-center gap-x-2">
            <input id="sync-theme-preview" type="checkbox" class="toggle toggle-sm" v-model="config.syncThemePreview" />
            <label for="sync-theme-preview" class="cursor-pointer" v-text="'Одинаковое оформление редактора и preview окна'" />
          </li>
        </menu>


        <div class="mt-6">
          <Collapse title="Расширенные">
            <menu>
              <li class="flex w-full items-center justify-between mt-8">
                <span v-text="'тип script'" class="font-medium" />
                <select v-model="config.script.type" class="select select-sm w-72 select-bordered">
                  <option v-for="(scriptType, name, i) in scriptTypes" :key="scriptType" :value="scriptType" v-text="scriptType" />
                </select>
              </li>
            </menu>
          </Collapse>
        </div>

      </div>
    </div>
  </Teleport>
  </button>
</template>

<style scoped>
  .fade-slide-enter-active,
  .fade-slide-leave-active {
    transform: translateY(0px);
    opacity: 1;
    max-height: 999px;
  }

  .fade-slide-enter-from,
  .fade-slide-leave-to {
    max-height: 0px;
    transform: translateY(15px);
    opacity: 0;
  }
</style>