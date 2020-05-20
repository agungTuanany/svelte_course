<script>
    import { createEventDispatcher, onMount, onDestroy, beforeUpdate, afterUpdate } from "svelte"

    // ###############################################
    const dispatch = createEventDispatcher ()
    const dispatchClose = () => dispatch ("close")
    const dispatchCancel = () => dispatch ("cancel")

    // ###############################################
    let agreed = false
    let autoscroll = false

    //const slotBtnDisclaimer = () =>  agreed = true
    function slotBtnDisclaimer () {
        return agreed = true
    }

    onMount (() =>  console.log ("onMount"))

    onDestroy (() => console.log ("onDestroy"))

    beforeUpdate (() => {
        console.log ("beforeUpdate")
        autoscroll = agreed
    })
    afterUpdate (() => {
        console.log ("afterUpdate")
        if (autoscroll) {
            const modal = document.querySelector (".modal")
            modal.scrollTo (0, modal.scrollHeight)
        }
    })

    console.log ("Script executed")

</script>

<style>
    .backdrop {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100vh;
        background: rgba(0, 0, 0, 0.75);
        z-index: 10;
    }

    .modal {
        padding: 1rem;
        position: fixed;
        top: 10vh;
        left: 10%;
        width: 80%;
        max-height: 30vh;
        background: white;
        border-radius: 5px;
        z-index: 100;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
        overflow: scroll;
    }

    header {
        border-bottom: 1px solid #ccc;
    }
</style>

<div class="backdrop" on:click="{dispatchClose}"></div>
<div class="modal">
    <!-- https://developer.mozilla.org/en-US/docs/Web/HTML/Element/Slot -->
    <header>
        <slot name="header" />
    </header>
    <div class="content">
        <slot />
    </div>
    <div class="disclaimer">
        <p>Before you close, you need to agree to our terms.</p>
        <button type="" on:click="{slotBtnDisclaimer}">Agree</button>
    </div>
    <footer>
        <slot name="footer" didAgree="{agreed}">
        <button on:click="{dispatchCancel}" disabled={!agreed}>Close</button>
        </slot>
    </footer>

</div>
