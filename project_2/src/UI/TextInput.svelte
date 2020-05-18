<script>
    export let controlType = undefined
    export let id
    export let label
    export let value
    export let type

</script>
<style>
    input,
    textarea {
        display: block;
        width: 100%;
        font: inherit;
        border: none;
        border-bottom: 2px solid #CCC;
        background: #f3f3f3;
        padding: 0.15rem 0.25rem;
        transition: border-color 0.1s ease-out;
    }

    input:focus,
    textarea:focus {
        border-color: #E40763;
        outline: none;
    }

    label {
        display: block;
        margin-top: 0.5rem;
        width: 100%;
    }

    .form-control {
        padding: 0.5rem 0;
        width: 100%;
        margin: 0,25rem 0;
    }
</style>

<div class="form-control">
    <label for="{id}">{label}</label>
    {#if controlType === "textarea"}
        <textarea name="" id="{id}" rows="6" cols="30" {value} on:input></textarea>
    {:else}
        <input type="{type}" {id} {value} on:input>
    {/if}
</div>
