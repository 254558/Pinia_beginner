import { effectScope } from 'vue'

const stores = new WeakMap()

export function defineStore(fn) {
  function useStore() {
    if (!stores.has(fn)) {
      const scope = effectScope(true)
      stores.set(
        fn,
        scope.run(() => fn())
      )
    }

    return stores.get(fn)
  }

  return useStore
}