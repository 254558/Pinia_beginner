// 这个文件就说了一句话：创建了要共享的数据n
// 顺便创建了n经过累加，倍增后的两个值：increment，double
import { ref, computed } from 'vue'
import { defineStore } from './my-pinia'


//我们在my-pinia里写了defineStore()这个函数
// 这个函数能处理一个参数
// 比如某个函数处理“张三”这个参数后，回车后就能看到：男，26，失业
// defineStore这个函数处理处理“fn”这个参数后
// 就能看到n, double, increment具体的数值
export const useCountStore = defineStore(() => {
  const n = ref(0)
  
  const increment = (amount = 1) => {
    n.value += amount
  }

  const double = computed(() => n.value * 2)

  return { n, double, increment }
})