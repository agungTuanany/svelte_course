<script>
    // Dependencies
    import { createEventDispatcher } from "svelte"

    // Buildin dependencies
    import TextInput    from "./../UI/TextInput.svelte"
    import Button       from "./../UI/Button.svelte"
    import Modal        from "./../UI/Modal.svelte"
    import { isEmpty, isValidEmail }  from "./../helpers/validation.js"

    // ############################################
    // Props
    let title               = ""
    let subtitle            = ""
    let time                = ""
    let imageUrl            = ""
    let address             = ""
    let email               = ""
    let description         = ""

    const dispatch = createEventDispatcher ()
    // ############################################
    // Reactive expression
    $: titleValid       = !isEmpty (title)
    $: subtitleValid    = !isEmpty (subtitle)
    $: timeValid        = !isEmpty (time)
    $: imageUrlValid    = !isEmpty (imageUrl)
    $: addressValid     = !isEmpty (address)
    $: emailValid       = isValidEmail (email)
    $: descriptionValid = !isEmpty (description)
    $: formIsValid = titleValid &&
        subtitleValid &&
        timeValid &&
        imageUrlValid &&
        addressValid &&
        emailValid &&
        descriptionValid


    // ############################################
    // Instant functions
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

    function cancel () {
        dispatch ("cancel")
    }


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
            valid="{titleValid}"
            validityMessage="Please enter a valid title"
            on:input={event => {title = event.target.value}}
        />
        <TextInput
            id="subtitle"
            label="subtitle"
            value="{subtitle}"
            valid="{subtitleValid}"
            validityMessage="Please enter a subtitle"
            on:input={event => {subtitle = event.target.value}}
        />
        <TextInput
            id="time"
            label="time"
            value="{time}"
            valid="{timeValid}"
            validityMessage="Please enter a approximate time"
            on:input={event => {time = event.target.value}}
        />
        <TextInput
            id="imageUrl"
            label="imageUrl"
            value="{imageUrl}"
            valid="{imageUrlValid}"
            validityMessage="Please enter an image"
            on:input={event => {imageUrl = event.target.value}}
        />
        <TextInput
            id="address"
            label="address"
            value="{address}"
            valid="{addressValid}"
            validityMessage="Please enter a valid address"
            on:input={event => {address = event.target.value}}
        />
        <TextInput
            id="email"
            label="E-mail"
            type="email"
            value="{email}"
            valid="{emailValid}"
            validityMessage="Please enter a correct email"
            on:input={event => {email = event.target.value}}
        />
        <TextInput
            id="description"
            label="description"
            rows=4
            cols=8
            controlType="textarea"
            valid="{descriptionValid}"
            validityMessage="Please enter some description"
            bind:value="{description}"
        />
    </form>
    <div slot="footer">
        <Button type="button" mode="outline" on:click={cancel}>Cancel</Button>
        <Button type="button" on:click={submitForm} disabled="{!formIsValid}">Save</Button>
    </div>
</Modal>
