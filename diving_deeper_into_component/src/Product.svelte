<script>
    import { createEventDispatcher } from "svelte"
    export let productTitle

    const dispatch = createEventDispatcher ()

    function addToCart () {
        // dispacth second argument is optional
        dispatch ('add-to-cart', {id: "p1"})
    }
</script>

<article>
    <h1>{productTitle}</h1>

    <button on:click="{addToCart}">Add to Cart</button>
    <button on:click="{() => dispatch ("delete", {deleted: "button-clicked"})}">Delete</button>
</article>
