<script setup lang="ts">
const products = [
  { idProduct: 1, description: "A", price: 1000 },
  { idProduct: 2, description: "B", price: 5000 },
  { idProduct: 3, description: "C", price: 30 },
];
</script>

<template>
  <div class="title">Checkout</div>
  <div v-for="product in products">
    <span class="product-description">{{ product.description }}</span>
    <span class="product-price">{{ product.price }}</span>
  </div>
</template>

<style scoped></style>
