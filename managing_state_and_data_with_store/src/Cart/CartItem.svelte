<script>
    import cartItems from "./cart-store.js";
    import { products } from "./../Products/product-store.js";
    import Button from "./../UI/Button.svelte";

    // #####################################
    // Props
    export let title;
    export let price;
    export let id;
    export let info;

    let showDescription = false;
    let description = "Not available";
    // let fetchedProducts = []

    // #####################################
    // Instant functions

    // products.subscribe (prods => {
    //     fetchedProducts = prods
    // })

    const displayDescription = () => {
        showDescription = !showDescription;
        // description = fetchedProducts.find (p => p.id === id).description
        const unsubscribe = products.subscribe((prods) => {
            description = prods.find((p) => p.id === id).description;
        });
        unsubscribe();
    };

    // const removeFromCart = () => {
    //     cartItems.update (items => {
    //         return items.filter (item => item.id == id)
    //     })
    // }

    function removeFromCart() {
        cartItems.removeItem(id);
    }
</script>

<li>
    <h1>{title}</h1>
    <h2>{price}</h2>
    <h2>{info}</h2>
    <Button mode="outline" on:click={displayDescription}>
        {showDescription ? "Hide Description" : "Show Description"}
    </Button>
    <Button on:click={removeFromCart}>Remove From Cart</Button>
    {#if showDescription}
        <p>{description}</p>
    {/if}
</li>

<style>
    li {
        margin: 1rem 0;
        border-radius: 5px;
        background: white;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
        padding: 1rem;
    }

    h1,
    h2 {
        font-size: 1rem;
        margin: 0;
    }

    h2 {
        color: #494949;
        margin-bottom: 1rem;
    }
</style>
