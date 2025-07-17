<script setup>
import { useDangoShop } from './dango-shop'
import DangoShopMessages231 from './components/DangoShopMessages-231.vue'
import DangoStick231 from './components/DangoStick-231.vue'

const dangoShop = useDangoShop()
</script>

<template>
  <h1>团子商店 🍡</h1>

  <button data-test="btn-add" class="mx-2" :disabled="dangoShop.cartAmount >= 100" @click="dangoShop.cartAmount++">
    增加团子 🍡
  </button>
  <button data-test="btn-remove" :disabled="dangoShop.cartAmount < 1" @click="dangoShop.cartAmount--">
    减少一个 🍡
  </button>

  <!-- 你不需要修改这一行 -->
  <DangoShopMessages231 />

  <template v-if="dangoShop.cartAmount >= 50">
    <p data-test="msg-huge-order">确定吗？这可是个<b>大订单</b> 😅。</p>
    <button data-test="btn-reset" @click="dangoShop.cartAmount = 0">重新开始</button>
  </template>

  <!-- 你不需要修改这些元素的任何类 -->
  <section data-test="dangos" class="grid lg:grid-cols-5 grid-cols-3 pt-[100px] pl-[40px] pr-[200px]">
    <div v-for="i in dangoShop.cartAmount" :key="i" class="w-1/3 h-[50px] rotate-[262deg] origin-center">
      <DangoStick231 />
    </div>
  </section>
</template>