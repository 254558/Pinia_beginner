<script setup>
import { ref } from 'vue'
import { useTodosStore } from '../../stores/todos'
import { storeToRefs } from 'pinia'

const todos = useTodosStore()

// 保留注释的失败案例
// const { list } = toRefs(todos)
// const { finished } = storeToRefs(todos)
// const { add } = toRefs(todos)
// const update = toRef(todos, 'update')

// const text = ref('')
// function addTodo() {
//   if (!text.value) return
//   useTodosStore().add(text.value)
//   text.value = ''
// }

const { list, finished } = storeToRefs(todos)
const { add, update } = todos

const text = ref('')
function addTodo() {
  if (!text.value) return
  add(text.value)
  text.value = ''
}
</script>

<template>
  <!-- 模板部分保持不变 -->
  <ClientOnly>
    <main>
      <h3>Destructuring stores (2)</h3>

      <form class="space-x-2" @submit.prevent="addTodo()">
        <input v-model="text" type="text" />
        <button>Add</button>
      </form>

      <p>You have {{ list.length }} todos. {{ finished.length }} are finished.</p>

      <ul>
        <li v-for="todo in list">
          <span class="mr-2" :class="todo.finished && 'line-through'">{{ todo.text }}</span>
          <button title="Finish this todo" @click="update({ ...todo, finished: true })">✔️</button>
        </li>
      </ul>
    </main>
  </ClientOnly>
</template>
