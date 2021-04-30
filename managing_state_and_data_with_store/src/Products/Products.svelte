<script>
    import { products } from "./product-store.js";
    import Product from "../Products/Product.svelte";

    // let products = [
    //     {
    //         id: "p1",
    //         title: "A Book",
    //         price: 9.99,
    //         description: "A great book!",
    //         info: "updating from Products.svelte",
    //     },
    //     {
    //         id: "p2",
    //         title: "A Carpet",
    //         price: 99.99,
    //         description: "Red and green.",
    //         info: "updating from Products.svelte",
    //     },
    // ];
</script>

<section>
    <h1>Products</h1>
    {#each $products as product (product.id)}
        <Product
            id={product.id}
            title={product.title}
            price={product.price}
            info={product.info}
            description={product.description}
        />
    {/each}
</section>

<style>
    section {
        width: 30rem;
        max-width: 90%;
        margin: 2rem auto;
    }
</style>
