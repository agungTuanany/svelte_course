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
        editMode = null

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
    <MeetupGrid meetups={$meetups} />

</main>

