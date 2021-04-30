<script>
    // Props
    export let controlType = null;
    export let id;
    export let label;
    export let value;
    export let type = "text";
    export let rows = null;
    export let cols = null;
    export let valid = true;
    export let validityMessage = "";

    // ############################################
    // State Management
    let touched = false;

    // ############################################
    // Instant functions
    let bindBlur = () => (touched = true);
</script>

<div class="form-control">
    <label for={id}>{label}</label>
    {#if controlType === "textarea"}
        <textarea
            class:invalid={!valid && touched}
            {id}
            {rows}
            {cols}
            bind:value
            on:blur={bindBlur}
        />
    {:else}
        <input
            class:invalid={!valid && touched}
            {type}
            {id}
            {value}
            on:input
            on:blur={bindBlur}
        />
    {/if}
    {#if validityMessage && !valid && touched}
        <p class="error-message">{validityMessage}</p>
    {/if}
</div>

<style>
    /*{{{*/
    input,
    textarea {
        display: block;
        width: 100%;
        font: inherit;
        border: none;
        border-bottom: 2px solid #ccc;
        background: #f3f3f3;
        padding: 0.15rem 0.25rem;
        transition: border-color 0.1s ease-out;
    }

    input:focus,
    textarea:focus {
        border-color: #e40763;
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
        margin: 0, 25rem 0;
    }

    .invalid {
        border-color: red;
        background: #fde3e3;
    }

    .error-message {
        color: red;
        margin: 0.25rem 0;
    }
    /*}}}*/
</style>
