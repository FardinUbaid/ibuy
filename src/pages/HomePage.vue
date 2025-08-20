<template>
  <q-page class="home-page relative-position">
    <!-- Background -->
    <div class="main-bg"></div>
    <div class="background-images">
      <img
        src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80"
        class="bg-img img1"
        alt="Fresh fruits"
      />
      <img
        src="https://images.unsplash.com/photo-1464306076886-debede6bbf94?auto=format&fit=crop&w=1200&q=80"
        class="bg-img img2"
        alt="Vegetables"
      />
      <img
        src="https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=1200&q=80"
        class="bg-img img3"
        alt="Bakery"
      />
      <img
        src="https://images.unsplash.com/photo-1505250461400-205f5cabaa9b?auto=format&fit=crop&w=1200&q=80"
        class="bg-img img4"
        alt="Groceries"
      />
    </div>
    <div class="gradient-overlay absolute-full"></div>

    <div class="overlay absolute-full flex flex-center column text-center">
      <!-- Slider -->
      <div class="slider-container mb-xl">
        <q-carousel
          v-model="slide"
          arrows
          animated
          swipeable
          control-color="white"
          infinite
          autoplay
          :interval="4000"
          class="slider"
          navigation
          navigation-position="bottom"
          direction="rtl"
        >
          <q-carousel-slide v-for="(img, i) in slides" :key="i" :name="i" :img-src="img" />
        </q-carousel>
      </div>

      <div class="app-name mb-4">- iBuy -</div>
      <div class="text-subtitle1 text-white mb-xl" style="max-width: 600px; line-height: 1.6">
        Hungry? Discover fresh foods, groceries, and more. Add your favorites to the cart and enjoy
        fast delivery!
      </div>
      <q-btn
        color="accent"
        label="Go Shopping"
        icon="shopping_cart"
        unelevated
        class="text-h6 shadowed-btn"
        style="min-width: 220px"
        @click="$router.push('/shop')"
      />
    </div>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'

const slides = ['/img/1.jpg', '/img/2.jpg', '/img/3.jpg']

const slide = ref(0)
</script>

<style scoped lang="scss">
.home-page {
  overflow: hidden;
  min-height: 100vh;
  position: relative;

  .main-bg {
    position: absolute;
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    z-index: 0;
    background: url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1600&q=80')
      center center / cover no-repeat;
    filter: blur(8px) brightness(0.7);
  }

  .background-images {
    position: absolute;
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    z-index: 1;
    pointer-events: none;

    .bg-img {
      position: absolute;
      opacity: 0.35;
      filter: blur(2px) brightness(0.9);
      border-radius: 16px;
      object-fit: cover;
      transition: transform 0.5s ease;
      box-shadow: 0 4px 32px rgba(0, 0, 0, 0.18);
    }

    .img1 {
      top: 8%;
      left: 4%;
      width: 22vw;
      height: 28vh;
      transform: rotate(-6deg);
    }
    .img2 {
      top: 55%;
      right: 6%;
      width: 24vw;
      height: 30vh;
      transform: rotate(4deg);
    }
    .img3 {
      bottom: 10%;
      left: 30%;
      width: 20vw;
      height: 24vh;
      transform: rotate(-2deg);
    }
    .img4 {
      top: 30%;
      right: 28%;
      width: 18vw;
      height: 22vh;
      transform: rotate(8deg);
    }
  }

  .gradient-overlay {
    z-index: 2;
    pointer-events: none;
    background: linear-gradient(120deg, rgba(0, 0, 0, 0.45) 0%, rgba(0, 0, 0, 0.15) 100%);
  }

  .overlay {
    z-index: 3;
    padding: 2rem;
  }

  .app-name {
    font-family: 'Pacifico', cursive;
    font-size: 3rem;
    letter-spacing: 2px;
    background: linear-gradient(90deg, #ff9800 0%, #ff5722 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    text-shadow: 2px 2px 8px rgba(255, 152, 0, 0.18);
    font-weight: bold;
    color: #fff;
    line-height: 1.2;
    padding-bottom: 1.2rem;
    margin-bottom: 2.5rem;
    display: inline-block;
  }

  .shadowed-btn {
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
    transition: all 0.3s ease;
    &:hover {
      transform: scale(1.05);
      box-shadow: 0 12px 24px rgba(0, 0, 0, 0.5);
    }
  }

  .slider-container {
    max-width: 900px;
    width: 90%;
    margin: 0 auto 2rem;

    .slider {
      height: 50vh;
      min-height: 250px;
      max-height: 400px;
      border-radius: 16px;
      overflow: hidden;
    }
  }
}
</style>
