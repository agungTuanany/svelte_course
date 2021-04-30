<script>
    // Dependencies
    import { createEventDispatcher } from "svelte";

    // Buildin dependencies
    import TextInput from "./../UI/TextInput.svelte";
    import Button from "./../UI/Button.svelte";
    import Modal from "./../UI/Modal.svelte";
    import { isEmpty, isValidEmail } from "./../helpers/validation.js";
    import meetups from "./meetup-store";

    // ############################################
    // Props
    export let id = null;

    let title = "";
    let subtitle = "";
    let time = "";
    let imageUrl = "";
    let address = "";
    let email = "";
    let description = "";

    const dispatch = createEventDispatcher();
    // ############################################
    // Reactive expression
    $: titleValid = !isEmpty(title);
    $: subtitleValid = !isEmpty(subtitle);
    $: timeValid = !isEmpty(time);
    $: imageUrlValid = !isEmpty(imageUrl);
    $: addressValid = !isEmpty(address);
    $: emailValid = isValidEmail(email);
    $: descriptionValid = !isEmpty(description);
    $: formIsValid =
        titleValid &&
        subtitleValid &&
        timeValid &&
        imageUrlValid &&
        addressValid &&
        emailValid &&
        descriptionValid;

    // ############################################
    // Instant functions

    // if id is not null
    if (id) {
        const unsubscribe = meetups.subscribe((items) => {
            const selectedMeetup = items.find((i) => i.id === id);
            title = selectedMeetup.title;
            subtitle = selectedMeetup.subtitle;
            time = selectedMeetup.time;
            imageUrl = selectedMeetup.imageUrl;
            address = selectedMeetup.address;
            email = selectedMeetup.contactEmail;
            description = selectedMeetup.description;
        });

        // unsubscribe after fetching data
        unsubscribe();
    }

    function submitForm() {
        const meetupData = {
            title: title,
            subtitle: subtitle,
            time: time,
            imageUrl: imageUrl,
            address: address,
            contactEmail: email,
            description: description,
        };

        /* XXX NOTE:
         * Using meetups.push() it doesn't work in svelteJS, the problem are, push() method is not a trigger that signal
         * use svelte that needs to checks the DOM potentially update the DOM.
         * meetups.push (newMeetup) // DOES NOT WORK !!
         *
         * "PUT" method use is overwrite all data in firebase (server) with new incoming data,
         * "PATCH" method use is overwrite all data and keep the rest
         * END NOTE XXX*/

        // If have an id = edit mode
        if (id) {
            fetch(
                `https://svelte-course-57736.firebaseio.com/meetups/${id}.json`,
                {
                    method: "PATCH",
                    body: JSON.stringify({ ...meetupData }),
                    headers: { "Content-Type": "application/json" },
                }
            )
                .then((res) => {
                    if (!res.ok) {
                        throw new Error("PATCH method through server Failed");
                    }
                    // Update meetup locally
                    meetups.updateMeetup(id, meetupData);
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            fetch("https://svelte-course-57736.firebaseio.com/meetups.json", {
                method: "POST",
                body: JSON.stringify({ ...meetupData, isFavorite: false }),
                headers: { "Content-Type": "application/json" },
            })
                .then((res) => {
                    if (!res.ok) {
                        throw new Error("POST method from to server Failed");
                    }

                    return res.json();
                })
                .then((data) => {
                    meetups.addMeetup({
                        ...meetupData,
                        isFavorite: false,
                        id: data.name,
                    });
                })
                .catch((err) => {
                    console.log(err);
                });
        }

        dispatch("save");
    }

    function cancel() {
        dispatch("cancel");
    }

    function deleteMeetup() {
        fetch(`https://svelte-course-57736.firebaseio.com/meetups/${id}.json`, {
            method: "DELETE",
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error("DELETE method through server failed");
                }
                // Delete meetup
                meetups.removeMeetup(id);
            })
            .catch((err) => {
                console.log(err);
            });
        dispatch("save");
    }
</script>

<Modal title="Edit Meetup Data" on:cancel>
    <form on:submit|preventDefault={submitForm} action="" method="post">
        <!-- {{{ -->
        <TextInput
            id="title"
            label="title"
            value={title}
            valid={titleValid}
            validityMessage="Please enter a valid title"
            on:input={(event) => {
                title = event.target.value;
            }}
        />
        <TextInput
            id="subtitle"
            label="subtitle"
            value={subtitle}
            valid={subtitleValid}
            validityMessage="Please enter a subtitle"
            on:input={(event) => {
                subtitle = event.target.value;
            }}
        />
        <TextInput
            id="time"
            label="time"
            value={time}
            valid={timeValid}
            validityMessage="Please enter a approximate time"
            on:input={(event) => {
                time = event.target.value;
            }}
        />
        <TextInput
            id="imageUrl"
            label="imageUrl"
            value={imageUrl}
            valid={imageUrlValid}
            validityMessage="Please enter an image"
            on:input={(event) => {
                imageUrl = event.target.value;
            }}
        />
        <TextInput
            id="address"
            label="address"
            value={address}
            valid={addressValid}
            validityMessage="Please enter a valid address"
            on:input={(event) => {
                address = event.target.value;
            }}
        />
        <TextInput
            id="email"
            label="E-mail"
            type="email"
            value={email}
            valid={emailValid}
            validityMessage="Please enter a correct email"
            on:input={(event) => {
                email = event.target.value;
            }}
        />
        <TextInput
            id="description"
            label="description"
            rows="4"
            cols="8"
            controlType="textarea"
            valid={descriptionValid}
            validityMessage="Please enter some description"
            bind:value={description}
        />
        <!-- }}} -->
    </form>

    <div slot="footer">
        <Button type="button" mode="outline" on:click={cancel}>Cancel</Button>
        <Button type="button" on:click={submitForm} disabled={!formIsValid}
            >Save</Button
        >
        {#if id}
            <Button type="button" on:click={deleteMeetup}>Delete</Button>
        {/if}
    </div>
</Modal>

<style>
    form {
        width: 30rem;
        max-width: 90%;
        margin: auto;
    }
</style>
