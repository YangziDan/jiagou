<template>
  <business-nav></business-nav>
  <el-card class="shop-list-container">
    <h2>门店列表</h2>
    <el-table :data="shops" style="width: 100%" @row-click="toShop">
      <el-table-column prop="id" label="ID" width="180" ></el-table-column>
      <el-table-column prop="name" label="店铺名称"></el-table-column>
      <!-- 添加其他需要的列 -->
    </el-table>
  </el-card>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import { useUserStore } from '../stores/user.js';
import axios from 'axios';
import router from "@/router/index.js";
import BusinessNav from "@/components/businessNav.vue";
const shops = ref([]);
const userStore = useUserStore()
const store = useUserStore();
const baseUrl = 'http://localhost:8555';
const bus_id =ref()
onMounted(async () => {
  userStore.getUser().then(user=>{
    bus_id.value=user.id
    // 从后端获取店铺列表
    axios.get(`${baseUrl}/business/shop`,{
      params:{
        bus_id: user.id
      }
    }).then(response=>{
      if (response.status === 200) {
        shops.value = response.data;
      } else {
        console.error('Failed to fetch shops', response.data);
      }
    })
  })

});
function toShop(row, column,e){
  router.push({
    path:"/business/shopItem"+"/"+row.id,
  })
}
</script>

<style scoped>
.shop-list-container {
  margin: 20px;
}
</style>
