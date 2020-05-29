<script>
    import Product from "./Product.svelte"
    import CartItem from "./CartItem.svelte"

    let renderedComponent = { cmp: Product, title: "Test Product", id: "p1" }

    function toggle () {
        if (renderedComponent.cmp === Product) {
            renderedComponent = { cmp: CartItem, title: "Another test Product", id: "p2" }

        }
        else {
            renderedComponent = { cmp:Product, title: "Test Product", id: "p1" }
        }
    }
</script>


<style>
</style>

<main>
    <button on:click={toggle}>Toggle Display</button>
    <svelte:component this={renderedComponent.cmp} title={renderedComponent.title} id={renderedComponent.id} />
    <p>Visit the <a href="https://svelte.dev/tutorial">Svelte tutorial</a> to learn how to build Svelte apps.</p>
</main>
