<script>
    /*
    * NOTE: Transition differ from motion, motion essentially animated value, transition essentially animated appearance
    * and disappearance of element, so element rendered in a DOM.
    *
     */

    // ####################################
    // Dependencies
    import { writable } from "svelte/store"
    import { tweened } from "svelte/motion"
    import { cubicIn } from "svelte/easing"
    import { fade, fly, slide, scale } from"svelte/transition"
    import { flip } from "svelte/animate"

    // Buildin Dependencies
    import Spring from "./Spring.svelte"
    // ####################################
    // Instant variable
    let boxInput
    let showParagraph = false

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
        boxes = [boxInput.value, ...boxes]
    }

    function discard (value) {
        boxes = boxes.filter (el => el !== value)
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

    <button on:click="{() => showParagraph = !showParagraph}">Toggle</button>

    {#if showParagraph}
        <p in:fade out:fly={{x: 300}}>Can you see me?</p>
    {/if}

    <hr>

    <input type="text" bind:this="{boxInput}">
    <button on:click="{addBox}">Add</button>

    <!-- XXX NOTE: change transition value as: "fade", "fly", "slide", "scale" XXX
        XXX NOTE: transition:fly={{}} <== the double curly braces is not a syntax instead still a single curly braces
        that tells Svelte that about to add dynamic calculated value, but then the dynamic calculated value is simply
        is a JavaScript object -->

    <!-- <div transition:scale={{easing: cubicIn, opacity: 0.50 }}>{box}</div> -->

    {#if showParagraph}
        {#each boxes as box (box)}
            <div
                transition:fly={{ x: 200, y: 0  }}
                on:click={discard.bind(this, box)}
                on:introstart={() => console.log ('Adding the element starts')}
                on:introend={() => console.log ('Adding the element ends')}
                on:outrostart={() => console.log ('Removing the element starts')}
                on:outroend={() => console.log ('Removing the element ends')}
                animate:flip={{duration: 300}}
            >
                {box}
            </div>
        {/each}
    {/if}

</main>
