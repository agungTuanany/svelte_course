<script>
    export let goal;

    $: doHighlight = goal.includes("!");
</script>

<!-- markup -->
<h1 class:higlight={doHighlight}>{goal}</h1>

<!-- end markup -->

<style>
    .highlight {
        color: red;
    }
</style>
