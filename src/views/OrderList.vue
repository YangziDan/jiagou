<template>
  <navigation></navigation>
  <el-container>
    <el-header>
      <h1>我的订单</h1>
    </el-header>
    <el-main>
      <el-table
          :data="orders"
          style="width: 100%"
          @row-click="handleRowClick"
      >
        <el-table-column
            prop="id"
            label="订单ID"
            width="180"
        ></el-table-column>
        <el-table-column
            prop="state"
            label="订单状态"
            width="180"
        ></el-table-column>
        <el-table-column
            prop="createTime"
            label="创建时间"
        ></el-table-column>
        <el-table-column>
          <template #header>
            操作
          </template>
          <template #default="scope">
            <el-button type="success" @click="confirm(scope.row)">确认</el-button>
          </template>
        </el-table-column>
        <el-table-column >
          <template #header>
            操作
          </template>
          <template  #default="scope">
            <el-button type="primary" @click="refund(scope.row)">退款</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-main>
  </el-container>
</template>

<script setup>
import {ref, onMounted} from 'vue'
import axios from 'axios'
import {useUserStore} from '../stores/user.js'
import Navigation from "@/components/navigation.vue";

const orders = ref([])
const userStore = useUserStore()

onMounted(async () => {
  userStore.getUser().then(user => {
    const response = axios.get('http://localhost:8555/allOrder', {
      params: {
        cus_id: user.id // 假设用户对象有一个id属性
      },
    }).then(response=>{
      orders.value = response.data
    })

  })


})

function handleRowClick(row) {
  // 跳转到订单详情页面，你可以使用Vue Router的push方法
  // 假设你有一个名为OrderDetail的组件和一个动态路由来匹配订单ID
  this.$router.push({name: 'OrderDetail', params: {orderId: row.id}})
}


</script>

<style scoped>
/* 添加你的样式 */
</style>
