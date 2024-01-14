<template>

  <el-card class="login-container">
    <h2>软件架构大作业</h2>
    <el-form :model="loginForm" @submit.native.prevent="handleSubmit">
      <el-form-item>
        <el-input
            v-model="loginForm.username"
            placeholder="用户名"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-input
            type="password"
            v-model="loginForm.password"
            placeholder="密码"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleSubmit">登录</el-button>
      </el-form-item>
    </el-form>
  </el-card>

</template>

<script setup>
import {ref} from 'vue';
import {useRouter} from 'vue-router';
import {useUserStore} from '../stores/user.js';
import axios from 'axios';
import Navigation from "@/components/navigation.vue";
import {ElMessage} from "element-plus";

let loginForm = ref({
  username: '',
  password: '',
});
import cookies from "vue-cookies";

const router = useRouter();
const store = useUserStore();
const baseUrl = "http://localhost:8555"
const handleSubmit = async () => {
  try {
    const response = await axios.post(baseUrl + '/login', loginForm.value);
    if (response.data.code === 1) {
      let token = response.data.token
      cookies.set('token', token)
      if (response.data.data.type == 2) {
        router.push({
          path: '/shopList'
        });
      } else {
        router.push({
          path: '/businessOrder'
        });
      }

    } else {
      // 显示错误信息
      console.error(response.data.msg);
      ElMessage({
        message: response.data.msg,
        type: 'warning',
      })
    }
  } catch (error) {
    console.error('登录失败:', error);
  }
};
</script>

<style scoped>
.login-container {
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  margin-top: 100px;
}
</style>
