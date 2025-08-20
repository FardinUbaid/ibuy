<template>
  <q-layout view="lHh Lpr lFf">
    <!-- HEADER -->
    <q-header elevated class="main-header">
      <q-toolbar>
        <q-btn flat dense round icon="eva-home-outline" @click="$router.push('/')" />
        <q-toolbar-title>
          <span class="app-name-bg">
            <span class="app-name">iBuy</span>
          </span>
        </q-toolbar-title>
        <q-btn flat dense round icon="eva-shopping-cart-outline" @click="cartOpen = !cartOpen">
          <q-badge color="red" floating>{{ cart.totalCount }}</q-badge>
        </q-btn>
      </q-toolbar>
    </q-header>

    <!-- CART DRAWER -->
    <q-drawer
      side="right"
      v-model="cartOpen"
      overlay
      behavior="mobile"
      show-if-above
      class="cart-drawer"
    >
      <q-toolbar class="bg-grey-2 text-dark">
        <q-toolbar-title>
          <q-icon name="shopping_cart" class="q-mr-sm" />
          Cart
        </q-toolbar-title>
        <q-btn flat dense round icon="eva-close-outline" @click="cartOpen = false" />
      </q-toolbar>
      <q-separator />

      <!-- Cart Items -->
      <q-list v-if="cart.items.length">
        <q-item v-for="item in cart.items" :key="item.id" class="cart-item">
          <q-item-section avatar>
            <q-icon name="shopping_bag" color="primary" />
          </q-item-section>
          <q-item-section>
            <div class="cart-item-name">{{ item.name }}</div>
            <div class="cart-item-price">{{ item.qty }} × {{ item.price }} TK</div>
          </q-item-section>
        </q-item>
      </q-list>
      <div v-else class="q-pa-md text-center text-grey-7">
        <q-icon name="shopping_bag_off" size="32px" class="q-mb-sm" />
        Your cart is empty.
      </div>

      <q-separator />

      <div class="q-pa-md">
        <div class="text-subtitle1 text-primary">Total: {{ cart.totalPrice }} TK</div>
        <div class="text-caption text-grey-7">Items: {{ cart.totalCount }}</div>

        <div v-if="!checkoutVisible" class="q-mt-sm">
          <q-btn
            color="accent"
            label="Checkout"
            class="full-width checkout-btn"
            rounded
            @click="checkoutVisible = true"
          />
        </div>

        <div v-else>
          <q-input
            v-model.number="checkoutAmount"
            label="Enter total amount"
            type="number"
            dense
            outlined
            placeholder="0"
            class="q-mt-sm"
          />

          <q-btn
            color="primary"
            label="Confirm Purchase"
            class="full-width q-mt-sm checkout-btn"
            rounded
            @click="handleCheckout"
          />

          <!-- Success message -->
          <div v-if="checkoutSuccess" class="text-green q-mt-sm row items-center justify-center">
            <q-icon name="eva-checkmark-circle-2-outline" class="q-mr-sm" />
            <span class="cart-success">Purchase Successful!</span>
          </div>

          <!-- Amount mismatch -->
          <div
            v-else-if="checkoutAttempted && checkoutAmount !== cart.totalPrice"
            class="text-negative q-mt-sm row items-center justify-center"
          >
            <q-icon name="eva-close-outline" class="q-mr-sm" />
            <span class="cart-fail">Purchase Failed! Amount does not match.</span>
          </div>
        </div>
      </div>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue'
import { useCartStore } from 'src/stores/CartStore'

const cartOpen = ref(false)
const cart = useCartStore()

const checkoutVisible = ref(false)
const checkoutAmount = ref(null)
const checkoutSuccess = ref(false)
const checkoutAttempted = ref(false)

const handleCheckout = () => {
  checkoutAttempted.value = true
  if (checkoutAmount.value === cart.totalPrice) {
    checkoutSuccess.value = true
  } else {
    checkoutSuccess.value = false
  }
}
</script>

<style scoped>
.app-name-bg {
  display: inline-block;
  padding: 0.3em 1.2em;
  border-radius: 2em;
  background: linear-gradient(90deg, rgba(57, 227, 215, 0.35) 0%, rgba(95, 202, 181, 0.696) 100%);
  box-shadow: 0 2px 16px rgba(255, 152, 0, 0.16);
  backdrop-filter: blur(6px);
}

.app-name {
  font-family: 'Pacifico', cursive;
  font-size: 2.7rem;
  letter-spacing: 2px;
  background: linear-gradient(90deg, #ff9800 0%, #ff5722 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 2px 2px 8px rgba(255, 152, 0, 0.18);
  font-weight: bold;
  line-height: 1.2;
}

.cart-drawer {
  background: linear-gradient(120deg, #f5f7fa 0%, #c3cfe2 100%);
  border-top-left-radius: 18px;
  border-bottom-left-radius: 18px;
  box-shadow: -2px 0 16px rgba(33, 150, 243, 0.08);
}

.cart-item {
  margin-bottom: 8px;
  border-radius: 10px;
  background: #fff;
  box-shadow: 0 1px 6px rgba(33, 150, 243, 0.04);
  padding: 6px 0;
}

.cart-item-name {
  font-family: 'Montserrat', sans-serif;
  font-weight: 600;
  font-size: 1.1rem;
  color: #1976d2;
}

.cart-item-price {
  font-size: 0.95rem;
  color: #333;
}

.checkout-btn {
  font-size: 1.1rem;
  font-weight: 600;
  letter-spacing: 1px;
  box-shadow: 0 2px 12px rgba(33, 150, 243, 0.1);
}

.cart-success {
  font-weight: 600;
  font-size: 1.1rem;
}

.cart-fail {
  font-weight: 600;
  font-size: 1.1rem;
}
</style>
