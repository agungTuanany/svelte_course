<script>
    // Buildin dependencies
    import CustomInput  from "./UI/CustomInput.svelte"
    import Toggle       from "./UI/Toggle.svelte"

    // ###########################################
    // Props
    let val                 = null
    let selectedOption      = 1
    let price               = 0
    let agreed              = null
    let radioFavColor       = "red"
    let checkboxFavColor    = ["green"]

    // ###########################################
    // Reactive expression
    $: console.log ("val", val)
    $: console.log ("selectedOptions", selectedOption)
    $: console.log ("price", price)
    $: console.log ("agreed", agreed)
    $: console.log ("radioFavColor", radioFavColor)
    $: console.log ("checkboxFavColor", checkboxFavColor)

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
    <!--
    <input type="number" value="{price}" on:input="{event => console.log ("event.target.value","1" + event.target.value)}" >
    -->
    <!--Svelte help using two-way-binding, when fetching data from input with type number or with type range, svelte convert automatically get number and no need convert manualy from string into number  -->
    <input type="number" bind:value="{price}" />

    <label for="">
        <input type="checkbox" bind:checked="{agreed}">
        Agree to term?
    </label>

    <h1>Radio Button Favorite color</h1>
    <label for="">
        <input type="radio" name="color" id="" value="red" bind:group="{radioFavColor}">
        Red
    </label>
    <label for="">
        <input type="radio" name="color" id="" value="yellow" bind:group="{radioFavColor}">
        Yellow
    </label>
    <label for="">
        <input type="radio" name="color" id="" value="green" bind:group="{radioFavColor}">
        Green
    </label>

    <h1>Checkbox Favorite color</h1>
    <label for="">
        <input type="checkbox" name="color" id="" value="red" bind:group="{checkboxFavColor}">
        Red
    </label>
    <label for="">
        <input type="checkbox" name="color" id="" value="yellow" bind:group="{checkboxFavColor}">
        Yellow
    </label>
    <label for="">
        <input type="checkbox" name="color" id="" value="green" bind:group="{checkboxFavColor}">
        Green
    </label>
    <p>Visit the <a href="https://svelte.dev/tutorial">Svelte tutorial</a> to learn how to build Svelte apps.</p>
</main>
