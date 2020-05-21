<script>
    // Buildin dependencies
    import CustomInput      from "./UI/CustomInput.svelte"
    import Toggle           from "./UI/Toggle.svelte"
    import { isValidEmail}  from "./lib/validation.js"

    // ###########################################
    // Props
    let val                 = ""
    let selectedOption      = 1
    let price               = 0
    let agreed              = null
    let radioFavColor       = "red"
    let checkboxFavColor    = ["green"]
    let singleFavColor      = "yellow"
    let usernameInput       = null
    let someDiv             = null
    let customInput         = null
    let enteredEmail        = ""
    let formIsValid         = false

    // ###########################################

    // Buildin validation
    $: if (isValidEmail (enteredEmail)) {
        formIsValid = true
    }
    else {
        formIsValid = false
    }

    // Reactive expression
    $: console.log ("val", val)
    $: console.log ("selectedOptions", selectedOption)
    $: console.log ("price", price)
    $: console.log ("agreed", agreed)
    $: console.log ("radioFavColor", radioFavColor)
    $: console.log ("checkboxFavColor", checkboxFavColor)
    $: console.log ("singleFavColor", singleFavColor)
    $: console.log ("customInput", customInput)

    // ###########################################
    // Instant functions
    const  setValue =  (event) => val = event.target.value

    const saveData = () => {
        // console.log (document.querySelector ("#username").value)
        console.log ("usernameInput.value: ",usernameInput.value)
        console.dir ("full element", usernameInput)

        console.dir ("someDiv", someDiv)
        customInput.empty ()
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

    .invalid {
        border: 1px solid red;
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
    <!-- If you have use case were you really need to trigger a function inside of the component this how you can do it -->
    <CustomInput bind:val="{val}" bind:this="{customInput}" />

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

    <!--
        The value on option can be set dynamically help with {#each} block, and the value doesn't have to be a string, Svelte support bind select dropdowns to an object.
    -->
    <h1>Select Dropdown Favorite Color</h1>
    <select bind:value="{singleFavColor}">
        <option value="red">Red</option>
        <option value="yellow">Yellow</option>
        <option value="green">Green</option>
    </select>
    <hr>

    <!--
        `bind:this` is specially understood by Svelte compiler, can store a reference to the element pointer into variable you choose.
        So reference and connection is setup behind the scene by Svelte. This is not two-way-binding, this is just a pointer at the full element were not restricted to reading it's own value
        NOTICE: changing something with is not RECOMMENDED, should do changing with svelte normal syntax, but reading values from "bind:this" is really useful
    -->
    <h1>Binding Custom Element</h1>
    <input type="text" id="username" bind:this="{usernameInput}">
    <button on:click="{saveData}">Save</button>

    <!-- binding in div element -->
    <div bind:this="{someDiv}"> </div>

    <hr>
    <!--
        Which capability does Svelte have when it come to offering help on validating input? None. Svelte not offered completed buildin validation solution. Instead Svelte give a tool to build your own validation.
    -->
    <h1>Binding Validation</h1>
    <form  on:submit|preventDefault>
        <input type="email" bind:value="{enteredEmail}" class="{isValidEmail (enteredEmail) ? "" : "invalid"}">
        <button type="submit" disabled="{!formIsValid}">Save</button>
    </form>

    <p>Visit the <a href="https://svelte.dev/tutorial">Svelte tutorial</a> to learn how to build Svelte apps.</p>
</main>
