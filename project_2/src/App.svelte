<script>
    import Header       from "./UI/Header.svelte"
    import MeetupGrid   from "./Meetups/MeetupGrid.svelte"
    import TextInput    from "./UI/TextInput.svelte"
    import Button       from "./UI/Button.svelte"

    // ####################################################
    let title       = ""
    let subtitle    = ""
    let time        = ""
    let imageUrl    = ""
    let address     = ""
    let email       = ""
    let description = ""


    let meetups = [
        {
            id              : "meetup1",
            title           : "Frontend Development with SvelteJS",
            subtitle        : "Create a todo with svelte",
            time            : "16:00 GMT",
            description     : "In this meetup, we will have some exprets talks about front-end development",
            imageUrl        :  "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Svelte_Logo.svg/1200px-Svelte_Logo.svg.png",
            address         : "27th Munchies Road, 22441 New Mark",
            contactEmail    : "code@test.com"
        },
        {
            id              : "meetup2",
            title           : "Backend with hapiJS",
            subtitle        : "Why hapiJS not express?",
            time            : "16:00 GMT",
            description     : "In this meetup, we talk about back-end development",
            imageUrl        : "https://blog.newrelic.com/wp-content/uploads/hapijs.jpg",
            address         : "27th Munchies Road, 22441 New Mark",
            contactEmail    : "codeExpress@test.com"
        },
    ]

    // ####################################################

    function addMeetup () {
        const newMeetup = {
            id              : Math.random ().toString (),
            title           : title,
            subtitle        : subtitle,
            time            : time,
            imageUrl        : imageUrl,
            address         : address,
            contactEmail    : email,
            description     : description
        }

        /*
         * Using meetups.push() it doesn't work in svelteJS, the problem are, push() method is not a trigger that signal
         * to use svelte that needs to checks the DOM potentially update the DOM.
         */
        // meetups.push (newMeetup) // DOES NOT WORK !!
        meetups = [newMeetup, ...meetups]

    }
</script>

<style>
    main {
        margin-top: 5rem;
    }

    form {
        width: 30rem;
        max-width: 90%;
        margin: auto;
    }
</style>

<Header/>
<main>
    <form on:submit|preventDefault="{addMeetup}" action="" method="post">
        <TextInput
            id="title"
            label="title"
            value="{title}"
            on:input={event => {title = event.target.value}} />
        <TextInput
            id="subtitle"
            label="subtitle"
            value="{subtitle}"
            on:input={event => {subtitle = event.target.value}} />
        <TextInput
            id="time"
            label="time"
            value="{time}"
            on:input={event => {time = event.target.value}} />
        <TextInput
            id="imageUrl"
            label="imageUrl"
            value="{imageUrl}"
            on:input={event => {imageUrl = event.target.value}} />
        <TextInput
            id="address"
            label="address"
            value="{address}"
            on:input={event => {address = event.target.value}} />
        <TextInput
            id="email"
            label="E-mail"
            type="email"
            value="{email}"
            on:input={event => {email = event.target.value}} />
        <TextInput
            id="description"
            label="description"
            value="{description}"
            controlType="textarea"
            on:input={event => {description = event.target.value}} />
            <Button type="submit" caption="Save" />
    </form>
    <!-- <MeetupGrid meetup="{meetup}" /> -->
    <MeetupGrid {meetups}/>

</main>

