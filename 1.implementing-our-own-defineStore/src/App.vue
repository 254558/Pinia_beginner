<script setup>
import { ref } from 'vue'
import MyPage from './MyPage.vue'

const showPage = ref(true)
</script>

<template>
  <button @click="showPage = !showPage">Toggle page</button>

  <MyPage v-if="showPage" />
  <MyPage v-if="showPage" />
  <MyPage v-if="showPage" />
</template>