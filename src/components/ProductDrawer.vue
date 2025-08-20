<template>
  <q-drawer
    v-model="isOpen"
    side="left"
    overlay
    elevated
    class="product-drawer bg-white"
    :width="350"
    @hide="reset"
  >
    <q-toolbar class="bg-primary text-white">
      <q-toolbar-title>Product Details</q-toolbar-title>
      <q-btn flat round icon="close" @click="isOpen = false" />
    </q-toolbar>

    <q-scroll-area style="height: calc(100% - 56px)">
      <div class="q-pa-md">
        <!-- Loading skeletons -->
        <div v-if="loading" class="column q-gutter-md">
          <q-skeleton type="text" width="80%" />
          <q-skeleton type="text" width="60%" />
          <q-skeleton type="text" width="90%" />
        </div>

        <!-- Product details -->
        <div v-else-if="product">
          <div class="text-h6 text-primary">{{ product.name }}</div>
          <div class="text-subtitle1 text-grey-8 q-mt-sm">${{ product.price }}</div>
          <div class="text-body2 q-mt-md">
            {{ product.description || 'No description available.' }}
          </div>
        </div>

        <!-- Not found -->
        <div v-else class="text-center text-grey-7 q-mt-xl">Product not found.</div>
      </div>
    </q-scroll-area>
  </q-drawer>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  modelValue: Boolean,
  productId: Number,
})

const emit = defineEmits(['update:modelValue'])

const isOpen = ref(props.modelValue)
const loading = ref(false)
const product = ref(null)

watch(
  () => props.modelValue,
  (val) => {
    isOpen.value = val
    if (val && props.productId) {
      fetchProduct(props.productId)
    }
  },
)

watch(isOpen, (val) => {
  emit('update:modelValue', val)
})

const fetchProduct = async (id) => {
  loading.value = true
  product.value = null
  try {
    const res = await fetch('http://localhost:3000/items')
    const allProducts = await res.json()
    product.value = allProducts.find((p) => p.id === id) || null
  } catch (err) {
    console.error(err)
  } finally {
    loading.value = false
  }
}

const reset = () => {
  product.value = null
}
</script>

<style scoped>
.product-drawer {
  max-height: 80vh; /* reduce height for now */
}
</style>
