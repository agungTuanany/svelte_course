<script>
    export let member
</script>
<!-- NOTE: how to render familyNode from inside familyNode
    Recursive component is really useful if rendering such a folder structure or
    whenever have a dependencies on self.
-->


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
