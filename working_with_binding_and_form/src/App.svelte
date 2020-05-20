<script>
    // Props
    let val = ""

    // Reactive expression
    $: console.log (val)

    // Instant functions
    const  setValue =  (event) => val = event.target.value



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

<main>
    <h1>Hello {val}!</h1>
    <input type="text" value="{val}" on:input={setValue}>
    <!--
        https://svelte.dev/tutorial/select-bindings
        if You had a variable "value" instead of "val", you can also use a shorthand notation:"bind:value" (instead of "bind:value={value}")
    -->
    <input type="text" bind:value={val} />


    <p>Visit the <a href="https://svelte.dev/tutorial">Svelte tutorial</a> to learn how to build Svelte apps.</p>
</main>
