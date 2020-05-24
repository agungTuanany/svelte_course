<script>
    import meetups      from "./Meetups/meetup-store.js"
    import Header       from "./UI/Header.svelte"
    import MeetupGrid   from "./Meetups/MeetupGrid.svelte"
    import TextInput    from "./UI/TextInput.svelte"
    import Button       from "./UI/Button.svelte"
    import EditMeetup   from "./Meetups/EditMeetup.svelte"

    // ####################################################
    //let meetups = []

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
    <MeetupGrid {$meetups} on:toggle-fav="{toggleFavorite}"/>

</main>

