<script setup>
import { useDangoShop } from '../dango-shop'

const dangoShop = useDangoShop()
</script>

<template>
  <p v-if="dangoShop.cartAmount >= 100">我所有的团子都给你了 😱</p>
  <hr />
  <p v-if="dangoShop.cartAmount < 1">
    <i title="日语欢迎光临" class="underline">いらっしゃいませ</i>! 您想要多少个团子？
  </p>
  <p v-else>
    您正在订购 {{ dangoShop.cartAmount }} 个团子。总共需要支付
    ¥{{ 350 * dangoShop.cartAmount }}。
    <template v-if="dangoShop.cartAmount >= 25 && dangoShop.cartAmount < 50">
      <br />
      您是要给排队的每个人都买一份吗？ 👀
    </template>
  </p>
</template>