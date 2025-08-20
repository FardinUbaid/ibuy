import { defineStore } from 'pinia'

export const useShopListStore = defineStore('shoppingList', {
  state: () => ({
    items: [],
    loading: false,
    currentPage: Number(localStorage.getItem('shopCurrentPage')) || 1,
    perPage: 10,
  }),

  actions: {
    async getItems() {
      this.loading = true
      try {
        const res = await fetch('http://localhost:3000/items')
        this.items = await res.json()

        await new Promise((resolve) => setTimeout(resolve, 1000))
      } catch (err) {
        console.error('Failed to fetch products:', err)
      } finally {
        this.loading = false
      }
    },

    setPage(page) {
      this.currentPage = page
      localStorage.setItem('shopCurrentPage', page)
    },
  },

  getters: {
    pagedItems: (state) => {
      const start = (state.currentPage - 1) * state.perPage
      const end = start + state.perPage
      return state.items.slice(start, end)
    },
    totalPages: (state) => Math.ceil(state.items.length / state.perPage),
  },
})
