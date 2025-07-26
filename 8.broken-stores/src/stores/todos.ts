import { useLocalStorage } from '@vueuse/core'
import { defineStore, acceptHMRUpdate, skipHydrate } from 'pinia'
import { computed } from 'vue'

// 重新添加接口定义，为TodoItem提供类型信息
export interface TodoItem {
  id: string
  text: string
  finished: boolean
  createdAt: number
}

export const useTodosStore = defineStore('todos', () => {
  // 恢复泛型类型定义，指定list为TodoItem数组
  const list = skipHydrate(useLocalStorage<TodoItem[]>('mastering-pinia-3.4 todolist', []))

  // 为计算属性添加返回类型
  const finished = computed<TodoItem[]>(() => list.value.filter(todo => todo.finished))
  const unfinished = computed<TodoItem[]>(() => list.value.filter(todo => !todo.finished))

  const mostRecent = computed<TodoItem | undefined>(() => {
    return list.value
      .slice()
      .sort((a, b) => b.createdAt - a.createdAt)
      .at(0)
  })

  // 为函数参数和返回值添加类型
  function add(text: string): void {
    list.value.push({
      id: crypto.randomUUID(),
      text,
      finished: false,
      createdAt: Date.now(),
    })
  }

  function update(updatedTodo: TodoItem): void {
    const index = list.value.findIndex(todo => todo.id === updatedTodo.id)
    if (index > -1) {
      list.value.splice(index, 1, updatedTodo)
    }
  }

  function remove(id: string): void {
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

    