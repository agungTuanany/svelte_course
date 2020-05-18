<script>
    import Product  from "./Product.svelte"
    import Modal    from "./UI/Modal.svelte"

    const products = [
        {
            id      : "p1",
            title   : "You dont know Svelte",
            price   : "9.25"
        },
        {
            id      : "p2",
            title   : "svelte component",
            price   : "9.10"
        }
    ]

    function addToCart (event) {
        console.log (event.detail)
    }

    const deleteProduct = e => console.log (e.detail)
</script>

<style>
    main {
        text-align: center;
        padding: 1em;
        max-width: 240px;
        margin: 0 auto;
    }

    h1 {
        color: #ff3e00;
        text-transform: uppercase;
        font-size: 4em;
        font-weight: 100;
    }

    @media (min-width: 640px) {
        main {
            max-width: none;
        }
    }
</style>

<!-- using default props:
    <Product
    title="{product.title}"
    price="{product.price}"
    ....
    ....
    />
-->
<main>
    {#each products as product}
        <Product
            {...product}
            on:add-to-cart="{addToCart}"
            on:delete="{deleteProduct}"
            />
    {/each}

    <Modal>
        <h1>Hello!</h1>
        <p>Using HTML slot component</p>
    </Modal>
    <p>Visit the <a href="https://svelte.dev/tutorial">Svelte tutorial</a> to learn how to build Svelte apps.</p>
</main>

