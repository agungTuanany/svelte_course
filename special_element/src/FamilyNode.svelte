<script context="module">
    /*
    * the context module script is useful if sharing data across all the same type component.
    * e.g: across all FamilyNode.
    */
    console.log ("Runs Once")

    let deactiveNode = undefined
</script>
<script>
    export let member

    let isActive = undefined

    console.log ("runs multiple times")

    function setAsActive () {
        if (deactiveNode) {
            deactiveNode ()
        }
        isActive = true
        deactiveNode = deactivate;

    }

    function deactivate () {
        isActive = false
    }

</script>

<style>
    .active {
        color: #CF0056;
    }
</style>



<!-- NOTE: how to render familyNode from inside familyNode
    Recursive component is really useful if rendering such a folder structure or
    whenever have a dependencies on self.
-->

<div on:click={setAsActive} class:active={isActive}>
    <h1>{member.name}</h1>
    {#if member.isParent}
        <ul>
            {#each member.children as child}
                <!-- <li>{child.name}</li> -->
                <li>
                    <svelte:self member={child} />
                </li>
            {/each}
        </ul>
    {/if}
</div>
