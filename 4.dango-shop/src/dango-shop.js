import { defineStore } from 'pinia'

export const useDangoShop = defineStore('store-state', {
  state: () => ({
    cartAmount: 0,
  }),
})