<template>
  <div>
    <h1>Broken Stores Demo</h1>
    <nav>
      <router-link to="/todo-list-1">Todo List 1</router-link> |
      <router-link to="/todo-list-2">Todo List 2</router-link> |
      <router-link to="/todo-list-3">Todo List 3</router-link>
    </nav>
    <router-view />
  </div>
</template>