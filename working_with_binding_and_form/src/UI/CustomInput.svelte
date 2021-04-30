<script>
    export let val;
    // Using type as dynamic. XXX As this lecture present using "type" as "dynamic" is not supported if input uses two-way-binding XXX
    // export let type

    export function empty() {
        val = "";
    }
</script>

<input type="text" bind:value={val} />
