<script>
    import Header       from "./UI/Header.svelte"
    import MeetupGrid   from "./Meetups/MeetupGrid.svelte"
    import TextInput    from "./UI/TextInput.svelte"
    import Button       from "./UI/Button.svelte"
    import EditMeetup   from "./Meetups/EditMeetup.svelte"

    // ####################################################
    let meetups = [
        {
            id              : "meetup1",
            title           : "Frontend Development with SvelteJS",
            subtitle        : "Create a todo with svelte",
            time            : "16:00 GMT",
            description     : "In this meetup, we will have some exprets talks about front-end development",
            imageUrl        :  "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Svelte_Logo.svg/1200px-Svelte_Logo.svg.png",
            address         : "27th Munchies Road, 22441 New Mark",
            contactEmail    : "code@test.com",
            isFavorite      : false
        },
        {
            id              : "meetup2",
            title           : "Backend with hapiJS",
            subtitle        : "Why hapiJS not express?",
            time            : "16:00 GMT",
            description     : "In this meetup, we talk about back-end development",
            imageUrl        : "https://blog.newrelic.com/wp-content/uploads/hapijs.jpg",
            address         : "27th Munchies Road, 22441 New Mark",
            contactEmail    : "codeExpress@test.com",
            isFavorite      : false
        },
    ]

    let editMode = null

    // ####################################################

    function addMeetup (event) {
        const newMeetup = {
            id              : Math.random ().toString (),
            title           : event.detail.title,
            subtitle        : event.detail.subtitle,
            time            : event.detail.time,
            imageUrl        : event.detail.imageUrl,
            address         : event.detail.address,
            contactEmail    : event.detail.email,
            description     : event.detail.description
        }

        /*
         * Using meetups.push() it doesn't work in svelteJS, the problem are, push() method is not a trigger that signal
         * to use svelte that needs to checks the DOM potentially update the DOM.
         */
        // meetups.push (newMeetup) // DOES NOT WORK !!
        meetups = [newMeetup, ...meetups]
        editMode = null

    }

    function toggleFavorite (event) {
        const id = event.detail
        const updatedMeetup = { ...meetups.find(m => m.id === id) }
        updatedMeetup.isFavorite = !updatedMeetup.isFavorite
        const meetupIndex = meetups.findIndex(m => m.id === id)
        const updatedMeetups = [...meetups]
        updatedMeetups[meetupIndex] = updatedMeetup
        meetups = updatedMeetups
    }

    function cancelEdit () {
        editMode = null
    }

</script>

<style>
    main {
        margin-top: 5rem;
    }

    .meetup-control {
        margin: 1rem;
    }

</style>

<Header/>
<main>
    <div class="meetup-controls">
        <Button on:click={() => editMode = "add"}>New Meetup</Button>
    </div>
    {#if editMode === "add"}
        <EditMeetup on:save="{addMeetup}" on:cancel="{cancelEdit}"/>
    {/if}
    <MeetupGrid {meetups} on:toggle-fav="{toggleFavorite}"/>

</main>

