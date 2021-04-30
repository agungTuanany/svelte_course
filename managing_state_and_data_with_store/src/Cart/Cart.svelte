<script>
    import { onDestroy } from "svelte";
    import CartItem from "./CartItem.svelte";
    import cartItems from "./cart-store.js";
    import { timer } from "./../timer-store.js";

    // ##################################
    let items = null;

    // ##################################
    const unsubscribe = timer.subscribe((count) => {
        console.log("Cart:", count);
    });

    //    export let items = [
    //        {
    //            id      : "p1",
    //            title   : "Test",
    //            price   : 9.99
    //        },
    //        {
    //            id      : "p2",
    //            title   : "Test",
    //            price   : 9.99
    //        }
    //    ]

    /*
     * It's still useful to know the manual setup, manual setup needed whenever you need to do anything else with the data from the store.
     * If you need transform the data before used in markup, if you need calculation, if you want to send to server, in all these cases
     * you need to get access to Store manually in your JavaScript code because you can run your logic.
     *
     * But if all you need to do is get it and out put it without any transformation then you can use auto-subscription
     *
     */

    // ##################################
    // const unsubscribe = cartItems.subscribe (itemCart => {
    //     items = itemCart
    // })

    onDestroy(() => {
        if (unsubscribe) {
            unsubscribe();
        }
    });
</script>

<section>
    <h1>Cart</h1>
    <ul>
        {#each $cartItems as item (item.id)}
            <CartItem
                id={item.id}
                title={item.title}
                price={item.price}
                info={item.info}
            />
        {:else}
            <p>No item in cart yet</p>
        {/each}
    </ul>
</section>

<style>
    section {
        width: 30rem;
        max-width: 90%;
        margin: 2rem auto;
        border-bottom: 2px solid #ccc;
    }

    ul {
        list-style: none;
        margin: 0;
        padding: 0;
    }
</style>
