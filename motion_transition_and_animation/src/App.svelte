<script>
    // ####################################
    // Dependencies
    import { writable } from "svelte/store"
    import { tweened } from "svelte/motion"
    import { cubicIn } from "svelte/easing"

    // Buildin Dependencies
    import Spring from "./Spring.svelte"

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


</script>


<style>
</style>

<main>
    <Spring />
    <!-- <progress value={$progress}></progress> -->
</main>
