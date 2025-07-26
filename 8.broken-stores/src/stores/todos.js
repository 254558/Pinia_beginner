import { useLocalStorage } from '@vueuse/core'
import { defineStore, acceptHMRUpdate, skipHydrate } from 'pinia'
import { computed } from 'vue'

export const useTodosStore = defineStore('todos', () => {
  // 移除了TypeScript的泛型类型定义
  const list = skipHydrate(useLocalStorage('mastering-pinia-3.4 todolist', []))

  // 移除了计算属性的返回类型定义
  const finished = computed(() => list.value.filter(todo => todo.finished))
  const unfinished = computed(() => list.value.filter(todo => !todo.finished))

  const mostRecent = computed(() => {
    return list.value
      .slice()
      .sort((a, b) => b.createdAt - a.createdAt)
      .at(0)
  })

  // 移除了函数参数的类型定义
  function add(text) {
    list.value.push({
      id: crypto.randomUUID(),
      text,
      finished: false,
      createdAt: Date.now(),
    })
  }

  function update(updatedTodo) {
    const index = list.value.findIndex(todo => todo.id === updatedTodo.id)
    if (index > -1) {
      list.value.splice(index, 1, updatedTodo)
    }
  }

  function remove(id) {
    const index = list.value.findIndex(todo => todo.id === id)
    if (index > -1) {
      list.value.splice(index, 1)
    }
  }

  return {
    list,
    finished,
    unfinished,
    mostRecent,

    add,
    update,
    remove,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useTodosStore, import.meta.hot))
}
    