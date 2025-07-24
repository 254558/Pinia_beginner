<script setup>
import { inject, toRef } from 'vue'
import { useTabKey } from './injectionKey'

const props = defineProps({
  title: {
    type: String,
    required: true
  }
})

const useTab = inject(useTabKey)
const { isVisible } = useTab(toRef(props, 'title'))
</script>

<template>
  <slot v-if="isVisible" />
</template>
