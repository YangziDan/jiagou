<template>
  <business-nav></business-nav>
  <el-row style="margin:0 0 0 2vw;width: 100vw" :gutter="30">
    <el-container>
      <el-col :span="1.5">
        <h5>&nbsp;</h5>
        <h1>新建</h1>
      </el-col>
      <el-col :span="10">
        <h3>商品名称</h3>
        <el-input placeholder="输入商品名称" v-model="name"></el-input>
      </el-col>
      <el-col :span="6">
        <h3>商品价格</h3>
        <el-input placeholder="输入商品价格" v-model="price"></el-input>
      </el-col>
      <el-col :span="3">
        <h3>&nbsp;</h3>
        <el-button type="success" @click="addItem()">新建商品</el-button>
      </el-col>
    </el-container>
  </el-row>
  <el-row style="margin:0 0 0 2vw;width: 100vw" :gutter="30">
    <el-container>
      <el-col :span="1.5">
        <h5>&nbsp;</h5>
        <h1>上架</h1>
      </el-col>
      <el-col :span="6">
        <h3>商品id</h3>
        <el-input placeholder="输入商品id" v-model="item_id"></el-input>
      </el-col>
      <el-col :span="6">
        <h3>门店id</h3>
        <el-input placeholder="输入门店id" v-model="shop_id"></el-input>
      </el-col>
      <el-col :span="4">
        <h3>价格</h3>
        <el-input placeholder="输入价格" v-model="listPrice"></el-input>
      </el-col>
      <el-col :span="3">
        <h3>&nbsp;</h3>
        <el-button type="success" @click="listItem()">上架商品</el-button>
      </el-col>
    </el-container>
  </el-row>
  <el-row></el-row>
  <el-card class="shop-detail-container">
    <el-table :data="items" style="width: 100%">
      <el-table-column prop="id" label="ID" width="180"></el-table-column>
      <el-table-column prop="name" label="商品名称"></el-table-column>
      <el-table-column prop="guidePrice" label="指导价"></el-table-column>
      <el-table-column>
        <template #header>
          操作
        </template>
        <template #default="scope">
          <el-button type="primary" @click="delItem(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

  </el-card>
</template>

<script setup>
import {ref, onMounted, reactive} from 'vue';
import {useUserStore} from '../stores/user.js';
import axios from 'axios';
import {useRoute} from 'vue-router';
import BusinessNav from "@/components/businessNav.vue";
import cookies from "vue-cookies";
import {ElMessage} from "element-plus";

const route = useRoute();
const items = ref([]);
const cart = reactive([]);
const userStore = useUserStore();
const baseUrl = 'http://localhost:8555';
let name = ref()
let price = ref()
let item_id=ref(3)
let shop_id=ref(1)
let bus_id
let listPrice=ref(1.0)

function listItem(){
  axios.post(`${baseUrl}/business/listItem`, {
    bus_id: parseInt(bus_id),
    item_id: parseInt(item_id.value),
    shop_id: parseInt(shop_id.value),
    price:parseFloat(listPrice)
  },{
    headers: {
      Authorization: cookies.get('token')
    },
  }).then(res=>{
    ElMessage({
      message:'成功上架',
      type:'success'
    })
  });
}
function addItem() {
  const response = axios.get(`${baseUrl}/business/newItem`, {
    params: {
      bus_id: bus_id,
      name: name.value,
      price: price.value
    },
    headers: {
      Authorization: cookies.get('token'),
    },
  });
}

onMounted(async () => {
  userStore.getUser().then(user => {
    bus_id = user.id
    const responseItems = axios.get(`${baseUrl}/business/item`, {
      params: {bus_id: bus_id},
      headers: {
        Authorization: cookies.get('token'),
      },
    }).then(responseItems => {
      if (responseItems.status === 200) {
        items.value = responseItems.data;
      } else {
        console.error('Failed to fetch items', responseItems.data);
      }
    })
  })

});

const addToCart = (item) => {
  cart.push({...item, quantity: 1});
};


</script>

<style scoped>
.shop-detail-container {
  margin-top: 4vh;
}
</style>
