<script>
    import Modal from "./Modal.svelte"

    // ###################################
    // Props
    export let message
</script>

<Modal title="An error occured!" on:cancel>
    <p>{message}</p>
</Modal>
