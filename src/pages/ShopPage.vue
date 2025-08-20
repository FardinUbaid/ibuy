<template>
  <q-page class="shop-page q-pa-md bg-grey-1">
    <div class="text-h4 text-primary text-center q-mb-lg">Shop Products</div>

    <!-- Skeletons always shown if loading or empty -->
    <div v-if="loading || products.length === 0" class="row q-col-gutter-md q-pa-md">
      <div v-for="n in perPage" :key="n" class="col-xs-12 col-sm-6 col-md-4">
        <q-card>
          <q-skeleton square style="width: 150px; aspect-ratio: 1 / 1" />
          <q-card-section>
            <q-skeleton type="text" class="q-mb-sm" />
            <q-skeleton type="text" width="60%" />
          </q-card-section>
          <q-card-actions align="right">
            <q-skeleton type="QBtn" />
          </q-card-actions>
        </q-card>
      </div>

      <!-- Only show "No products" message when products array is empty and not loading -->
      <div
        v-if="!loading && products.length === 0"
        class="text-center q-pa-xl text-grey-7"
        style="width: 100%"
      >
        <q-icon name="shopping_bag_off" size="48px" class="q-mb-md" />
        <div>No products available.</div>
      </div>
    </div>

    <!-- Products -->
    <div v-else class="row q-col-gutter-xl q-row-gutter-lg">
      <div v-for="product in products" :key="product.id" class="col-12 col-sm-6 col-md-4 col-lg-3">
        <q-card class="product-card q-hoverable">
          <!-- Clickable area triggers drawer -->
          <div @click="openDrawer(product.id)">
            <q-img :src="product.image" ratio="4/3" class="product-img" spinner-color="primary" />
            <q-card-section>
              <div class="text-h6 text-dark ellipsis">{{ product.name }}</div>
              <div class="text-subtitle2 text-primary q-mb-xs">Price: ${{ product.price }}</div>
            </q-card-section>
          </div>

          <q-card-actions align="right">
            <q-btn
              color="primary"
              label="Add to Cart"
              icon="eva-shopping-cart-outline"
              @click.stop="addToCart(product)"
              :disable="product.qty < 1"
            />
          </q-card-actions>
        </q-card>
      </div>
    </div>

    <!-- Load More -->
    <div v-if="shopStore.currentPage < shopStore.totalPages" class="q-pa-lg flex flex-center">
      <q-btn flat color="primary" label="Load More" @click="loadMore" />
    </div>

    <!-- Product Drawer -->
    <ProductDrawer v-model="drawerVisible" :product-id="selectedProductId" />
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useShopListStore } from 'src/stores/ShopListStore'
import { useCartStore } from 'src/stores/CartStore'
import ProductDrawer from 'src/components/ProductDrawer.vue'

const shopStore = useShopListStore()
const cartStore = useCartStore()

const products = ref([])
const loading = ref(false)
const perPage = shopStore.perPage || 10

const foodImages = [
  'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&w=400&q=80',
  'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&w=400&q=80',
]

const fetchProducts = async () => {
  loading.value = true
  try {
    await shopStore.getItems()
    products.value = shopStore.items.slice(0, perPage).map((p) => ({
      ...p,
      qty: p.qty || 1,
      image: p.image || foodImages[Math.floor(Math.random() * foodImages.length)],
    }))
    shopStore.currentPage = 1
  } catch (err) {
    console.error(err)
  } finally {
    loading.value = false
  }
}

const loadMore = () => {
  if (shopStore.currentPage < shopStore.totalPages) {
    shopStore.currentPage++
    const nextItems = shopStore.items
      .slice((shopStore.currentPage - 1) * perPage, shopStore.currentPage * perPage)
      .map((p) => ({
        ...p,
        qty: p.qty || 1,
        image: p.image || foodImages[Math.floor(Math.random() * foodImages.length)],
      }))
    products.value = [...products.value, ...nextItems]
  }
}

const addToCart = (product) => {
  cartStore.addItem({
    id: product.id,
    name: product.name,
    price: product.price,
    qty: product.qty || 1,
  })
}

// Drawer logic
const drawerVisible = ref(false)
const selectedProductId = ref(null)

const openDrawer = (id) => {
  selectedProductId.value = id
  drawerVisible.value = true
}

onMounted(fetchProducts)
</script>

<style scoped>
.shop-page {
  min-height: 100vh;
  background: linear-gradient(120deg, #f5f7fa 0%, #c3cfe2 100%);
}

.product-card {
  transition: box-shadow 0.2s;
  background: linear-gradient(120deg, #c4d78f 0%, #74c2da 100%);
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.07);
  border-radius: 16px;
  overflow: hidden;
}
.product-card:hover {
  box-shadow: 0 8px 32px rgba(33, 150, 243, 0.12);
}

.product-img {
  border-bottom: 1px solid #eee;
  border-radius: 0;
  min-height: 160px;
  background: #fafafa;
}
</style>
