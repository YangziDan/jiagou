import {createRouter, createWebHistory} from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView
        },
        {
            path: '/login',
            name: 'login',
            component: () => import('../views/login.vue')
        },
        {
            path: '/dashboard',
            name: 'dashboard',
            component: () => import('../views/dashboard.vue')
        },
        {
            path: '/shopList',
            name: 'shopList',
            component: () => import('../views/shopList.vue')
        }, {
            path: '/shopDetail/:shopId',
            name: 'shopDetail',
            component: () => import('../views/shopDetail.vue')
        }, {
            path: '/orders',
            name: 'OrdersList',
            component: () => import('../views/OrderList.vue')
        },
        {
            path: '/businessOrder',
            name: 'businessOrder',
            component: () => import('../views/businessOrder.vue')
        },
        {
            path: '/business/shop',
            name: 'businessShop',
            component: () => import('../views/businessShop.vue')
        },
        {
            path: '/business/shopItem/:shopId',
            name: 'shopItem',
            component: () => import('../views/BusinessShopItem.vue')
        },
        {
            path: '/business/item',
            name: 'businessItem',
            component: () => import('../views/businessItem.vue')
        },


    ]
})

export default router
