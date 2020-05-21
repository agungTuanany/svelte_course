<script>
    // Props
    export let controlType      = null
    export let id
    export let label
    export let value
    export let type             = "text"
    export let rows             = null
    export let cols             = null
    export let valid            = true
    export let validityMessage  = ""

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

    .invalid {
        border-color: red;
        background: #FDE3E3;
    }

    .error-message {
        color: red;
        margin: 0.25rem 0;
    }
</style>

<div class="form-control">
    <label for="{id}">{label}</label>
    {#if controlType === "textarea"}
        <textarea class:invalid="{!valid}" id="{id}" {rows} {cols} {value} on:input></textarea>
    {:else}
        <input class:invalid="{!valid}" type="{type}" {id} {value} on:input>
    {/if}
    {#if validityMessage && !valid}
        <p class="error-message">{validityMessage}</p>
    {/if}
</div>
