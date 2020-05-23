import { writable } from "svelte/store"

const cart = writable ([
    {
        id      : "p3",
        title   : "CartItems svelte",
        price   : 9.99,
        info    : "updating cart-item from cart-item.js"
    },
    {
        id      : "p4",
        title   : "Svelte cart items",
        price   : 9.99,
        info    : "updating cart-item from cart-item.js"
    }
])

export default cart
