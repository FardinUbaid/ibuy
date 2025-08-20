import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [],
  }),

  getters: {
    totalCount: (state) => state.items.reduce((sum, item) => sum + item.qty, 0),
    totalPrice: (state) => state.items.reduce((sum, item) => sum + item.qty * item.price, 0),
  },

  actions: {
    addItem(product) {
      const existing = this.items.find((i) => i.id === product.id)
      if (existing) {
        existing.qty += product.qty || 1
      } else {
        this.items.push({ ...product, qty: product.qty || 1 })
      }
    },

    removeItem(id) {
      this.items = this.items.filter((i) => i.id !== id)
    },

    updateQty(id, qty) {
      const item = this.items.find((i) => i.id === id)
      if (item) item.qty = qty
    },

    clearCart() {
      this.items = []
    },
  },
})
