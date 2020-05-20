<script>
    import { createEventDispatcher } from "svelte"

    import TextInput    from "./../UI/TextInput.svelte"
    import Button       from "./../UI/Button.svelte"
    import Modal        from "./../UI/Modal.svelte"

    // ############################################
    // Props
    let title       = ""
    let subtitle    = ""
    let time        = ""
    let imageUrl    = ""
    let address     = ""
    let email       = ""
    let description = ""

    const submitForm = () => {
        dispatch ("save", {
            title           : title,
            subtitle        : subtitle,
            time            : time,
            imageUrl        : imageUrl,
            address         : address,
            email           : email,
            description     : description
        })
    }

    const dispatch = createEventDispatcher ()

</script>

<style>
    form {
        width: 30rem;
        max-width: 90%;
        margin: auto;
    }

</style>



<Modal title="Edit Meetup Data" on:cancel>
    <form on:submit|preventDefault="{submitForm}" action="" method="post">
        <TextInput
            id="title"
            label="title"
            value="{title}"
            on:input={event => {title = event.target.value}}
        />
        <TextInput
            id="subtitle"
            label="subtitle"
            value="{subtitle}"
            on:input={event => {subtitle = event.target.value}}
        />
        <TextInput
            id="time"
            label="time"
            value="{time}"
            on:input={event => {time = event.target.value}}
        />
        <TextInput
            id="imageUrl"
            label="imageUrl"
            value="{imageUrl}"
            on:input={event => {imageUrl = event.target.value}}
        />
        <TextInput
            id="address"
            label="address"
            value="{address}"
            on:input={event => {address = event.target.value}}
        />
        <TextInput
            id="email"
            label="E-mail"
            type="email"
            value="{email}"
            on:input={event => {email = event.target.value}}
        />
        <TextInput
            id="description"
            label="description"
            value="{description}"
            rows=4
            cols=8
            controlType="textarea"
            on:input={event => {description = event.target.value}}
        />
        <!--
        <Button type="submit">Save</Button>
        -->
    </form>
</Modal>
