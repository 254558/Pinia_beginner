<script setup>
// ref：          创建单一值的响应式
// reactive：     创建对象的响应式
// onUnmounted：  在组件完全销毁前执行
// computed：     基于其他响应式数据动态计算新值
// provide：      跨层级组件通信
// watch：        监听数据变化
import { computed, onUnmounted, provide, watch } from 'vue'
import { useTabKey } from './injectionKey'

// 定义组件接收的 props，支持 v-model 双向绑定
const props = defineProps({
  modelValue: {
    type: Number,
    default: undefined
  }
})

const emit = defineEmits(['update:modelValue'])

const localCurrentTab = ref(0)

// 计算属性：当前标签页索引
// 支持两种模式：受控模式（通过 props.modelValue）和非受控模式（使用 localCurrentTab）
const currentTab = computed({
  get() {
    // 如果父组件通过 v-model 提供了值，则使用该值
    // 否则使用本地维护的 localCurrentTab
    return props.modelValue !== undefined ? props.modelValue : localCurrentTab.value
  },
  set(currentTab) {
    // 如果是不受控模式（没有通过 v-model 绑定），更新本地值
    if (props.modelValue === undefined) {
      localCurrentTab.value = currentTab
    }
    // 触发 update:modelValue 事件，通知父组件更新 v-model 的值
    emit('update:modelValue', currentTab)
  }
})

// 使用 Map 存储标签页列表，键为标签页ID，值为标签页标题
// 使用 reactive 使 Map 具有响应式特性
const tabList = reactive(new Map())

// 用于生成唯一标签页ID的计数器
let currentId = 0

// 向子组件提供 useTab 函数，用于注册标签页
provide(useTabKey, (title) => {
  // 为每个标签页分配唯一ID
  const myId = currentId++

  // 将标签页标题添加到标签页列表中
  tabList.set(myId, title.value)

  // 监听标签页标题变化，更新标签页列表
  watch(title, () => {
    tabList.set(myId, title.value)
  })

  // 组件卸载时，从标签页列表中移除当前标签页
  onUnmounted(() => {
    tabList.delete(myId)
  })

  // 计算属性：判断当前标签页是否激活
  const isVisible = computed(() => currentTab.value === myId)

  // 返回给子组件的对象，包含标签页是否可见的计算属性
  return {
    isVisible
  }
})
</script>

<template>
  <!-- 标签页按钮容器，使用 Tailwind CSS 的间距类 -->
  <div class="space-x-1 space-y-1">
    <!-- 遍历标签页列表，生成对应的按钮 -->
    <!-- 使用解构赋值获取标签页ID和标题 -->
    <button 
      v-for="[tabId, title] in tabList" 
      :disabled="currentTab === tabId" 
      @click="currentTab = tabId"
    >
      {{ title }}
    </button>
  </div>

  <!-- 插槽，用于放置当前激活标签页的内容 -->
  <slot />
</template>