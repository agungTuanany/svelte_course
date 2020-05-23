<script>
    import CartItem from "./CartItem.svelte"
    import cartItems from "./cart-store.js"

    // ##################################
    let items = null

    // ##################################
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

    // ##################################
    cartItems.subscribe (itemCart => {
        items = itemCart
    })

</script>

<style>
    section {
        width: 30rem;
        max-width: 90%;
        margin: 2rem auto;
        border-bottom: 2px solid #CCC;
    }

    ul {
        list-style: none;
        margin: 0;
        padding: 0
    }
</style>


<section>
    <h1>Cart</h1>
    <ul>
        {#each items as item (item.id)}
            <CartItem id={item.id} title={item.title} price={item.price} info={item.info} />
        {:else}
            <p>No item in cart yet</p>
        {/each}
    </ul>
</section>
