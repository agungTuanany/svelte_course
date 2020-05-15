<script>
export let goal

$: doHighlight = goal.includes ("!")
</script>

<style>
.highlight {
	color: red;
}

</style>

<!-- markup -->
<h1 class:higlight="{doHighlight}">{goal}</h1>

<!-- end markup -->
