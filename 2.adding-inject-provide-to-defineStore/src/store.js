// 这个文件就说了一句话：创建了要共享的数据n
// 顺便创建了n经过累加，倍增后的两个值：increment，double
import { ref, computed } from 'vue'
import { defineStore } from './my-pinia'


//我们在my-pinia里写了defineStore()这个函数
// 这个函数能处理一个参数，计算三个值
// 分别是n, double, increment
export const useCountStore = defineStore(() => {
  const n = ref(0)
  
  const increment = (amount = 1) => {
    n.value += amount
  }

  const double = computed(() => n.value * 2)

  return { n, double, increment }
})