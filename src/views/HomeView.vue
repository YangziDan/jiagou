<script setup>
import {onMounted} from "vue";
import {useRouter} from "vue-router";
const router=useRouter()
onMounted(()=>{
  router.push({
    path:'/login'
  })
})
</script>

<template>

</template>
