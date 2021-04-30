import { writable } from "svelte/store"


// Custom store with function way
// function createCart () {
//     const cart = writable ([
//         {
//             id      : "p3",
//             title   : "CartItems svelte",
//             price   : 9.99,
//             info    : "updating cart-item from cart-item.js"
//         },
//         {
//             id      : "p4",
//             title   : "Svelte cart items",
//             price   : 9.99,
//             info    : "updating cart-item from cart-item.js"
//         }
//     ])
//
//     return {
//         // Exposing subscribe method of created store
//         subscribe       : cart.subscribe,
//         addItem         : (item) => {
//             cart.update ((items) => {
//                 return [...items, item]
//             })
//         },
//         removeItem      : (id) => {
//             cart.update ((items) => {
//                 return items.filter (i => i.id !== id)
//             })
//         }
//
//     }
//
// }
//
//
// export default createCart ()

const cart = writable([
    {
        id: "p3",
        title: "CartItems svelte",
        price: 9.99,
        info: "updating cart-item from cart-item.js"
    },
    {
        id: "p4",
        title: "Svelte cart items",
        price: 9.99,
        info: "updating cart-item from cart-item.js"
    }
])

const customCart = {
    subscribe: cart.subscribe,
    addItem: (item) => {
        cart.update((items) => [...items, item])
    },
    removeItem: (id) => {
        cart.update((items) => items.filter(i => i.id !== id))
    }
}

export default customCart
