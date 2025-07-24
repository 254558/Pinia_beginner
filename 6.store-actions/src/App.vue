<script setup>
import { useDango } from './dango'
import EatingDango251 from './components/EatingDango-251.vue'


const dango = useDango()
</script>

<template>
  <h1>Let's eat some Dango 🍡</h1>

  <div class="space-x-2">
    <button data-test="btn-eat" :disabled="dango.amount < 1 || dango.isEating" @click="dango.eatDango()">Eat!</button>
    <button data-test="btn-start-eating" :disabled="dango.isEating || dango.amount < 1" @click="dango.startEating()">
      Start Eating until finished
    </button>
    <button data-test="btn-stop-eating" :disabled="!dango.isEating" @click="dango.stopEating()">Stop eating</button>
    <button @click="dango.$reset()">Reset</button>
  </div>

  <!-- 使用导入的组件 -->
  <EatingDango251 />
</template>