// 这个文件就说了一句话：检查缓存，有则返回，无则创建
import { effectScope } from 'vue'


// 用WeakMap这种数据结构把数据保存在stores这个常量中
// 不要纠结什么是WeakMap，就是一种性能更好的Map
// 也不要纠结什么是Map，你保存数据总得选一种数据结构嘛
// 总之，你要实现数据共享，总得先把数据保存下来吧
const stores = new WeakMap()


// 导出一个函数，这样别的文件就能用这个函数了
// 就像这样：import { defineStore } from './my-pinia'
export function defineStore(fn) {
  function useStore() {
    

    // 我们刚把数据保存到stores里了
    // 下面这句话的意思是，如果store里没有fn这个名字，就接着往下执行
    if (!stores.has(fn)) {


      // effectScope(true)的意思是：创建一个脱离父作用域的独立作用域
      //   - true：独立作用域，父作用域停止时不会影响它。
      //   - false：嵌套在父作用域中，父作用域停止时会连带停止。
      const scope = effectScope(true)


      //数据以名称和数值的方式保存在stores里
      // 下面代码的意思是：
      // 把名字设为传进来的那个名字，即fn
      // 把数值设为有独立作用域的名叫fn的函数
      stores.set(
        fn,
        scope.run(() => fn())
      )
    }


    // 从 stores 中查找：有没有用 fn 这个函数创建过 store 实例？
    // 如果有，直接返回这个实例；如果没有，返回 undefined
    return stores.get(fn)
  }

  return useStore
}