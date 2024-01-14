import { defineStore } from 'pinia'

export const useOrderStore = defineStore('order', {
    state: () => ({
        orders: []
    }),
    actions: {
        async fetchOrders(customerId) {
            const response = await fetch(`http://localhost:8555/allOrder?cus_id=${customerId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const data = await response.json()
            this.orders = data
        }
    }
})
