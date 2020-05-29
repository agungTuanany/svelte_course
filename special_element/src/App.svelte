<script>
    import Product from "./Product.svelte"
    import CartItem from "./CartItem.svelte"
    import FamilyNode from "./FamilyNode.svelte"

    // Tree component
    let familyStructure = [
        {
            isParent    : true,
            name        : "Chris",
            children    : [
                {
                    isParent    : true,
                    name        : "Moe",
                    children    : [
                        {
                            isParent    : false,
                            name        : "Jule"
                        }
                    ]
                }
            ]
        },
        { isParent: false, name: "Anna" }
    ]

    let showProduct = true

    let renderedComponent = { cmp: Product, title: "Test Product", id: "p1" }

    function toggle () {
        if (renderedComponent.cmp === Product) {
            renderedComponent = { cmp: CartItem, title: "Another test Product", id: "p2" }

        }
        else {
            renderedComponent = { cmp:Product, title: "Test Product", id: "p1" }
        }
    }

    function oriToggle () {
        showProduct = !showProduct
    }
</script>


<style>
</style>

<main>
    <h1>Dynamic component</h1>
    <button on:click={toggle}>Toggle Display</button>
    <svelte:component this={renderedComponent.cmp} title={renderedComponent.title} id={renderedComponent.id} />
    <hr>

    <!-- static component -->
    <h1>static component</h1>
    <button on:click={oriToggle}>Toogle Display</button>
    {#if showProduct}
        <Product title="Original Product" id="p1" />
    {:else}
        <CartItem title="Original CartItem" id= "p2" />
    {/if}

    <hr>

    {#each familyStructure as familyMember}
        <FamilyNode member={familyMember} />

    {/each}


    <p>Visit the <a href="https://svelte.dev/tutorial">Svelte tutorial</a> to learn how to build Svelte apps.</p>
</main>
