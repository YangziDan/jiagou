import {defineStore} from "pinia";

export const useMainStore = defineStore('main', {
    state: () => ({
        user: null,
        token: null,
        cart: [] // 添加购物车状态
    }),
    actions: {
        setUser(user) {
            this.user = user;
        },
        setToken(token) {
            this.token = token;
        },
        addToCart(item) {
            const cartItem = this.cart.find(i => i.id === item.id);
            if (cartItem) {
                cartItem.quantity++;
            } else {
                this.cart.push({ ...item, quantity: 1 });
            }
        },
        removeFromCart(itemId) {
            const index = this.cart.findIndex(item => item.id === itemId);
            if (index !== -1) {
                this.cart.splice(index, 1);
            }
        }
    },
    getters: {
        totalItems(state) {
            return state.cart.reduce((acc, item) => acc + item.quantity, 0);
        },
        totalPrice(state) {
            return state.cart.reduce((acc, item) => acc + item.quantity * item.guidePrice, 0);
        }
    }
});
