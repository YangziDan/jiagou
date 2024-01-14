<template>
  <business-nav></business-nav>
  <el-container>
    <el-header>
      <h1>门店订单</h1>
    </el-header>
    <el-main>
      <el-row :gutter="20">
        <el-col :span="10">
          <el-input placeholder="请输入门店id" v-model="shop_id"></el-input>
        </el-col>
        <el-col :span="4">
          <el-button :icon="Search" type="success"  @click="findOrder"  circle />
        </el-col>

      </el-row>

      <el-table
          :data="orders"
          style="width: 100%"
          @row-click="handleRowClick"
      >
        <el-table-column
            prop="id"
            label="订单ID"
        ></el-table-column>
        <el-table-column
            prop="state"
            label="订单状态"

        ></el-table-column>
        <el-table-column
            prop="createdAt"
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
import {
  Search,
} from '@element-plus/icons-vue'
import BusinessNav from "@/components/businessNav.vue";
import cookies from "vue-cookies";
const orders = ref([])
const userStore = useUserStore()
let shop_id=ref(1)
let bus_id=ref()
userStore.getUser().then(user=>{
  bus_id.value=user.id
})
 function findOrder(){
  try {
    const token = userStore.getToken
    const response = axios.get('http://localhost:8555/business/order', {
      params: {
        bus_id: bus_id.value,
        shop_id:shop_id.value
      },
      headers: {
        Authorization: cookies.get('token')// 如果后端需要token验证
      }
    }).then(response=>{
      orders.value = response.data
    })
  } catch (error) {
    console.error(error)
  }
}

function confirm(row){

}
function refund(row){

}



</script>

<style scoped>
/* 添加你的样式 */
</style>
