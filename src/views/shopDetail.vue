<template>
  <navigation></navigation>
  <el-card class="shop-detail-container">
    <h2>店铺名称: {{ shop.name }}</h2>
    <el-table :data="items" style="width: 100%">
      <el-table-column prop="id" label="ID" width="180"></el-table-column>
      <el-table-column prop="name" label="商品名称"></el-table-column>
      <el-table-column prop="guidePrice" label="指导价"></el-table-column>
      <el-table-column>
        <template #header>
          操作
        </template>
        <template #default="scope">
          <el-button type="primary" @click="addToCart(scope.row)">加入购物车</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-button type="primary" @click="submitOrder">下单</el-button>
  </el-card>
</template>

<script setup>
import { ref, onMounted, reactive } from 'vue';
import { useUserStore } from '../stores/user.js';
import axios from 'axios';
import { useRoute } from 'vue-router';
import Navigation from "@/components/navigation.vue";
import cookies from "vue-cookies";
const route = useRoute();
const shop = ref({});
const items = ref([]);
const cart = reactive([]);
const userStore = useUserStore();
const baseUrl = 'http://localhost:8555';

onMounted(async () => {
  const shopId = route.params.shopId;
    const responseItems = await axios.get(`${baseUrl}/allFood`, {
      params: { shopId },
      headers: {
        Authorization: cookies.get('token'),
      },
    });

    if (responseItems.status === 200) {
      items.value = responseItems.data;
    } else {
      console.error('Failed to fetch items', responseItems.data);
    }
});

const addToCart = (item) => {
  cart.push({ ...item, quantity: 1 });
};

const submitOrder = async () => {
  try {
    const orderData = {
      cus_id: userStore.user.id, // Assuming user has an ID property
      shop_id: Number(route.params.shopId),
      lineItems: cart.map((item) => ({
        item_id: item.id, // Assuming each item has an ID property
        quantity: item.quantity,
      })),
    };

    const response = await axios.post(`${baseUrl}/pick`, orderData, {
      headers: {
        Authorization: `Bearer ${userStore.getToken}`,
        'Content-Type': 'application/json',
      },
    });

    if (response.status === 200) {
      // Handle success, e.g., show a notification, redirect to another page, etc.
      console.log('Order placed successfully!', response.data);
      // Clear the cart
      cart.splice(0, cart.length);
    } else {
      console.error('Failed to place order', response.data);
    }
  } catch (error) {
    console.error('An error occurred while placing the order:', error);
  }
};
</script>

<style scoped>
.shop-detail-container {
  margin: 20px;
}
</style>
