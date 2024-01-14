
import { defineStore } from 'pinia'
import cookies from 'vue-cookies'
import axios from "axios";
import {ref} from "vue";
import {useRouter} from "vue-router";

export const useUserStore=defineStore('userStore',()=>{
  let baseUrl='http://localhost:8555'
  let user=ref(Object())
  async function getUser(){
    let token=cookies.get('token')
    const res=await axios.post(baseUrl+'/token',{
      token:token
    },{
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    return res.data.data
  }
  function checkLogin(){
    if(!isLogin()){
      let router=useRouter();
      router.push({
        path:'/login'
      })
      return false
    }
    return true
  }
  function isLogin(){
    let token=cookies.get('token')
    if(token==null||token==''){
      return false
    }
    console.log('isLogin() : token is :'+token)
    return true
  }
  return{isLogin,checkLogin,user,getUser,baseUrl}
})
