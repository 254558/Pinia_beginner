import { effectScope, inject } from 'vue'

// 导出一个函数，这个函数的作用是：检查缓存，有则返回，无则创建
export function defineStore(fn) {

  function useStore() {

    const globalEffect = inject(effectKey)
    const stores = inject(storesMapKey)

    // 如果没有我要的东西
    if (!stores.has(fn)) {
      
      // 创建这个东西
      const store = globalEffect
        .run(() => effectScope())  // 创建独立空间
        .run(() => fn())           // 创建我要的东西
      
      // 新增了我要的东西
      stores.set(fn, store)
    }
    
    // 给我我要的东西
    return stores.get(fn)
  }
  
  // 等待调用
  return useStore
}

// 刚才拿到了值，现在给值起名
const effectKey = Symbol('effect')
const storesMapKey = Symbol('stores')


// 导出一个值为undefined的常数
// 导undefined有毛用？
// 这个常数等于几不重要，重要的是计算这个常数的过程
// 就像财政补贴，人民拿到了多少不重要，耿专员拿多少才是重点
// 借函数计算的过程，又是定义这个又是设置那个，至于计算的结果，无人在意
export const appPlugin = app => {

  const stores = new WeakMap()
  const globalEffect = effectScope(true)

  app.provide(storesMapKey, stores)
  app.provide(effectKey, globalEffect)
  
}