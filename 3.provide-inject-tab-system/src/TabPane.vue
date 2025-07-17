<script setup>
import { inject, toRef } from 'vue'
// 导入自己人
import { useTabKey } from './injectionKey'

//prop是属性的意思
const props = defineProps({
  title: {
    type: String,
    required: true
  }
})

const useTab = inject(useTabKey)  

// 将 props 中的 title 转换为响应式引用
// 这样即使 props 更新，引用仍然保持响应式
// 调用 useTab 函数并传入 title 的响应式引用
// 返回一个包含 isVisible 属性的对象，用于控制标签页的显示状态
const { isVisible } = useTab(toRef(props, 'title')) 
</script>

<template>
  <!-- 只有当 isVisible 为 true 时才渲染插槽内容 -->
  <!-- 这使得标签页可以根据状态动态显示或隐藏 -->
  <slot v-if="isVisible" />
</template>