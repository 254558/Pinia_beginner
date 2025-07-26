// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'

// 导入主页面组件
import Home from '../pages/index//Home.vue'

// 导入三个待修复的页面组件
import TodoList1 from '../pages/index/todo-list-1.vue'
import TodoList2 from '../pages/index/todo-list-2.vue'
import TodoList3 from '../pages/index/todo-list-3.vue'

const routes = [
  {
    path: '/',
    component: Home,
    children: [
      {
        path: 'todo-list-1',
        component: TodoList1,
        name: 'TodoList1',
        meta: { title: 'Destructuring stores (1)' }
      },
      {
        path: 'todo-list-2',
        component: TodoList2,
        name: 'TodoList2',
        meta: { title: 'Destructuring stores (2)' }
      },
      {
        path: 'todo-list-3',
        component: TodoList3,
        name: 'TodoList3',
        meta: { title: 'Performance (1)' }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// 设置页面标题
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})

export default router