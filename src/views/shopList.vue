<template>
  <navigation></navigation>
  <el-card class="shop-list-container">
    <h2>门店列表</h2>
    <el-table :data="shops" style="width: 100%" @row-click="toShop">
      <el-table-column prop="id" label="ID" width="180" ></el-table-column>
      <el-table-column prop="name" label="店铺名称"></el-table-column>
      <el-table-column prop="business.businessName" label="所属商家"></el-table-column>
      <!-- 添加其他需要的列 -->
    </el-table>
  </el-card>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useUserStore } from '../stores/user.js';
import axios from 'axios';
import router from "@/router/index.js";
import Navigation from "@/components/navigation.vue";
const shops = ref([]);

const store = useUserStore();
const baseUrl = 'http://localhost:8555';
onMounted(async () => {
  try {
    // 从后端获取店铺列表
    const response = await axios.get(`${baseUrl}/allShop`);

    if (response.status === 200) {
      shops.value = response.data;
    } else {
      console.error('Failed to fetch shops', response.data);
    }
  } catch (error) {
    console.error('An error occurred:', error);
  }
});
function toShop(row, column,e){
  router.push({
    path:"/shopDetail"+"/"+row.id,

  })
}
</script>

<style scoped>
.shop-list-container {
  margin: 20px;
}
</style>
