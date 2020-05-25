<script>
    import meetups      from "./Meetups/meetup-store.js"
    import Header       from "./UI/Header.svelte"
    import MeetupGrid   from "./Meetups/MeetupGrid.svelte"
    import TextInput    from "./UI/TextInput.svelte"
    import Button       from "./UI/Button.svelte"
    import EditMeetup   from "./Meetups/EditMeetup.svelte"
    import MeetupDetail from "./Meetups/MeetupDetail.svelte"

    // ####################################################
    //let meetups = []

    let editMode    = null
    let page        = "overview"
    let pageData    = {}

    // ####################################################

    function addMeetup (event) {
        editMode = null

    }

    function cancelEdit () {
        editMode = null
    }

    function showDetails (event) {
        page = "details"
        pageData.id = event.detail
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
    {#if page === "overview"}
        <div class="meetup-controls">
            <Button on:click={() => editMode = "add"}>New Meetup</Button>
        </div>
        {#if editMode === "add"}
            <EditMeetup on:save="{addMeetup}" on:cancel="{cancelEdit}"/>
        {/if}
        <MeetupGrid meetups={$meetups} on:showdetails="{showDetails}" />
    {:else}
        <MeetupDetail id="{pageData.id}" />
    {/if}

</main>

