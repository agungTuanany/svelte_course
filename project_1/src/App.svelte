<!--
//{{{
    Side note:
    Svelte apps are built from multiple "Components" -UI building blocks -UI building blocks.
        It's the same philosophy as in React, Angular & Vue

    One important concepts on Svelte Reactivity in "updating array" is to assigning a new array, not by using
    push(), pop() method instead always store a new value in variable which used in markup. This is a "Common"
    rule in Svelte.

        Event Modifier:
    https://svelte.dev/tutorial/event-modifiers
    //}}}
-->
<script>
    //#################################################################
    // Dependencies

    import ContactCard from "./ContactCard.svelte";
    import CourseGoal from "./CourseGoal.svelte";

    //#################################################################
    // Instant variable
    let name = "";
    let title = "";
    let image = "";
    let description = "";
    let formState = "empty";

    let createdContacts = [];

    //#################################################################
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/label
    // Label statement in svelte
    $: uppercaseName = name.toUpperCase();

    //$: console.log (name)

    // using a dynamic Label statement with if statement
    $: if (name === "John Doe") {
        console.log("It changes the age");
        age = 25;
    }

    //#################################################################
    function addContact(event) {
        // event.preventDefault ()
        if (
            name.trim().length == 0 ||
            title.trim().length == 0 ||
            image.trim().length == 0 ||
            description.trim().length == 0
        ) {
            formState = "invalid";
            return;
        }
        // Svelte "reactivity"
        createdContacts = [
            ...createdContacts,
            {
                id: Math.random(),
                name: name,
                jobTitl: title,
                imageUr: image,
                desc: description,
            },
        ];

        console.log({ ...createdContacts });
        formState = "done";
    }

    function incrementAge() {
        age = age + 1;
    }

    // Reset to default name variable
    function changeName() {
        name = "John Doe";
    }

    // Set entered value as global
    // Bind input element
    function nameInput(event) {
        const enteredValue = event.target.value;
        name = enteredValue;
    }

    function jobInput(event) {
        const enteredValue = event.target.value;
        title = enteredValue;
    }

    function imageInput(event) {
        const enteredValue = event.target.value;
        image = enteredValue;
    }

    function jobDescInput(event) {
        const enteredValue = event.target.value;
        description = enteredValue;
    }

    function courseGoalInput(event) {
        const enteredValue = event.target.value;
        courseGoal = enteredValue;
    }

    function deleteFirst(event) {
        createdContacts = createdContacts.slice(1);
    }
    function deleteLast(event) {
        createdContacts = createdContacts.slice(0, -1);
    }
</script>

<main>
    <div id="form">
        <div class="form-control">
            <label for="userName">User Name</label>
            <input
                type="text"
                value={name}
                on:input={nameInput}
                id="userName"
            />
        </div>
        <div class="form-control">
            <label for="jobTitle">Job Title</label>
            <input
                type="text"
                value={title}
                on:input={jobInput}
                id="jobTitle"
            />
        </div>
        <div class="form-control">
            <label for="image">Image URL</label>
            <input type="text" value={image} on:input={imageInput} id="image" />
        </div>
        <div class="form-control">
            <label for="desc">Description</label>
            <input type="text" value={description} on:input={jobDescInput} />
        </div>
    </div>

    <!-- Add event modifier -->
    <button on:click|preventDefault={addContact}>Add Contact Card</button>
    <button on:click={deleteFirst}>Delete First</button>
    <button on:click={deleteLast}>Delete Last</button>

    {#if formState === "invalid"}
        <p>Invalid input</p>
    {:else}
        <p>Enter some data and hit the button</p>
    {/if}

    <!-- svelte update the data === svelte update the DOM -->
    {#each createdContacts as contact, index (contact.id)}
        <h2># {index + 1}</h2>
        <ContactCard
            userName={contact.name}
            jobTitle={contact.title}
            userImage={contact.image}
            description={contact.desc}
        />
    {:else}
        <p>Please start adding some contacts, we found none!</p>
    {/each}
    <p>
        Visit the <a href="https://svelte.dev/tutorial">Svelte tutorial</a> to learn
        how to build Svelte apps.
    </p>
</main>

<style>
    #form {
        width: 30rem;
        max-width: 100%;
    }
</style>
