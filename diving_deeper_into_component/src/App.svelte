<script>
    // Dependencies
    import { tick } from "svelte"
    import Product  from "./Product.svelte"
    import Modal    from "./UI/Modal.svelte"

    // ###############################################
    // Dummy Data
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

    let showModal = false
    let closeable = false

    let dummyText = "this is some dummy text!"

    // ###############################################
    // Functionalities
    function addToCart (event) {
        console.log (event.detail)
    }

    const deleteProduct = e => console.log (e.detail)

    const modalEventTrue = () => showModal = true
    const modalEventFalse = () => showModal = false

    const transformEvent = (event) => {
        // Tabs key is equal to "9"
        if (event.which !== 9) {
            return
        }
        event.preventDefault ()

        const selectionStart = event.target.selectionStart
        const selectionEnd = event.target.selectionEnd
        const value = event.target.value

        dummyText = value.slice (0, selectionStart) +
            value.slice (selectionStart, selectionEnd).toUpperCase () +
            value.slice (selectionEnd)

        // https://svelte.dev/tutorial/tick
        // tick() return a "promise" when the promise were resolve the next microtask well have been completed
        tick ().then (() => {
            event.target.selectionStart = selectionStart
            event.target.selectionEnd = selectionEnd
        })

        // Will not work!
        //event.target.selectionStart = selectionStart
        //event.target.selectionEnd = selectionEnd
    }
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

    <button on:click="{modalEventTrue}" type="">Show Modal</button>

    {#if showModal}
        <Modal
            on:cancel="{modalEventFalse}"
            on:close="{modalEventFalse}"
            let:didAgree="{closeable}">

        <h1 slot="header">Hello!</h1>
        <p>Using HTML slot component</p>
        <button slot="footer" on:click="{modalEventFalse}" disabled="{!closeable}">Confirm</button>
        </Modal>
    {/if}

    <textarea rows="5" cols="40" value="{dummyText}" on:keydown={transformEvent}></textarea>

    <p>Visit the <a href="https://svelte.dev/tutorial">Svelte tutorial</a> to learn how to build Svelte apps.</p>
</main>

