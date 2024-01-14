<template>
  <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
  >
    <el-menu-item ><h2>顾客</h2></el-menu-item>
    <el-menu-item @click="goto('/shopList')">门店</el-menu-item>
    <el-menu-item @click="goto('/orders')">订单</el-menu-item>
    <el-menu-item @click="goto('/login')">退出登录</el-menu-item>
  </el-menu>
</template>

<script setup>
import {useRouter} from "vue-router";
let router=useRouter()
function goto(place){
  router.push({
    path:place
  })
}
</script>

<style scoped>

</style>
