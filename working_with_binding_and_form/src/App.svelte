<script>
    // Buildin dependencies
    import CustomInput  from "./UI/CustomInput.svelte"
    import Toggle       from "./UI/Toggle.svelte"

    // ###########################################
    // Props
    let val = ""
    let selectedOption = 1

    // ###########################################
    // Reactive expression
    $: console.log (val)
    $: console.log (selectedOption)

    // ###########################################
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
    <!--  <input type="text" value="{val}" on:input={setValue}> -->
    <!--
        https://svelte.dev/tutorial/select-bindings
        if You had a variable "value" instead of "val", you can also use a shorthand notation:"bind:value" (instead of "bind:value={value}")
    -->
    <!-- <input type="text" bind:value={val} /> -->
    <CustomInput bind:val="{val}" />

    <!--
        two way binding in custom element

        Binding with two-way-binding in every component prop is not RECOMMEND!! Because easy to introduce bugs, lost track of how apps generally behave, make harder to analysis and grasp the application

        Rather expose an event in Toggle.svelte which fire when selected a new options and listen to that in app.svelte unless you really need to use this specific behavior and now how programmer doing with the code

        It worth to know two-way-binding can be setup on custom element with own props, it's not restricted to working with input only, however input are one of the most prominent use cases for  two-way-binding
    -->
    <Toggle bind:choosenOption="{selectedOption}" />


    <p>Visit the <a href="https://svelte.dev/tutorial">Svelte tutorial</a> to learn how to build Svelte apps.</p>
</main>
