<script setup>
import { computed, onUnmounted, provide, reactive, ref, watch } from 'vue'
import { useTabKey } from './injectionKey'

const props = defineProps({
  modelValue: {
    type: Number,
    default: undefined
  }
})

const emit = defineEmits(['update:modelValue'])

const localCurrentTab = ref(0)

const currentTab = computed({
  get: () => props.modelValue ?? localCurrentTab.value,
  set(currentTab) {
    if (props.modelValue == null) {
      localCurrentTab.value = currentTab
    }
    emit('update:modelValue', currentTab)
  },
})

const tabList = reactive(new Map())

let currentId = 0

provide(useTabKey, (title) => {
  const myId = currentId++

  tabList.set(myId, title.value)

  watch(title, () => {
    tabList.set(myId, title.value)
  })

  onUnmounted(() => {
    tabList.delete(myId)
  })

  const isVisible = computed(() => currentTab.value === myId)

  return {
    isVisible,
  }
})
</script>

<template>
  <div class="space-x-1 space-y-1">
    <button v-for="[tabId, title] in tabList" :disabled="currentTab === tabId" @click="currentTab = tabId">
      {{ title }}
    </button>
  </div>

  <slot />
</template>
