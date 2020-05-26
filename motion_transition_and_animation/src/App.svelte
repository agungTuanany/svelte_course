<script>
    // ####################################
    // Dependencies
    import { writable } from "svelte/store"
    import { tweened } from "svelte/motion"
    import { cubicIn } from "svelte/easing"

    // Buildin Dependencies
    import Spring from "./Spring.svelte"
    // ####################################
    // Instant variable
    let boxInput

    // ####################################
    // const progress = writable (0)
    const progress = tweened (0, {
        delay           : 0,
        duration        : 700,
        easing          : cubicIn,
    })

    setTimeout (() => {
        progress.set (0.5)
    }, 1500)

    let boxes = []

    function addBox () {
        boxes = [...boxes, boxInput.value]
    }
</script>


<style>
    div {
        width           : 10rem;
        height          : 10rem;
        background      : #CCC;
        margin          : 1rem;
        box-shadow      : 0 2px 8px rgba(0, 0, 0, 0.26);
        border-radius   : 5px;
        padding         : 1rem;
    }
</style>

<main>
    <!-- <Spring /> -->
    <!-- <progress value={$progress}></progress> -->

    <input type="text" bind:this="{boxInput}">
    <button on:click="{addBox}">Add</button>
    {#each boxes as box (box)}
        <div>{box}</div>
    {/each}
</main>
