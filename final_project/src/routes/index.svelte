<script context="module">
    export function preload (page) {
        //console.log ("preload function: ", page)
        return this.fetch ("https://svelte-course-57736.firebaseio.com/meetups.json")
            .then (res => {
                if (!res.ok) {
                    throw new Error ("Fetching data from server failed")
                }
                return res.json ()
            })
            .then (data => {
                const loadedMeetups = []
                for (const key in data) {
                    loadedMeetups.push ({
                        ...data [key],
                        id: key
                    })
                }
                return {fetchedMeetups: loadedMeetups}

                // For Development environment
                //setTimeout (() => {
                //    isLoading = false
                //    meetups.setMeetups (loadedMeetups.reverse ())
                //} , 1000)
            })
            .catch (err => {
                error = err
                isLoading = false
                console.log (err)
                this.error (500, "Could not fetch meetups from firebase!!")
            })

    }
</script>
<script>
    // Dependencies
    import { createEventDispatcher, onMount, onDestroy } from "svelte"
    import { scale } from "svelte/transition"
    import { flip } from "svelte/animate"

    // Buildin dependencies
    import meetups          from "./../store/meetup-store.js"
    import MeetupItem       from "./../components/Meetups/MeetupItem.svelte"
    import MeetupFilter     from "./../components/Meetups/MeetupFilter.svelte"
    import Button           from "./../components/UI/Button.svelte"
    import LoadingSpinner   from "./../components/UI/LoadingSpinner.svelte"
    import EditMeetup       from "./../components/Meetups/EditMeetup.svelte"


    // ################################################
    // props
    export let fetchedMeetups

    const dispatch = createEventDispatcher ()
    let favsOnly = false
    let editMode
    let editedId
    let isLoading

    // Reactive statement
    $: filteredMeetups = favsOnly ?  fetchedMeetups.filter (m => m.isFavorite) : fetchedMeetups


    // ################################################
    // Instant function

    onMount (() => {
        meetups.setMeetups (fetchedMeetups)
    })

    function setFilter (event) {
        favsOnly = event.detail === 1
    }

    function savedMeetup (event) {
        editMode = null
        editedId = null

    }

    function cancelEdit () {
        editMode = null
        editedId = null
    }

    function startEdit (event) {
        editMode = "edit"
        editedId = event.detail
    }
</script>

<style>
    #meetups {
        width                       : 100%;
        display                     : grid;
        grid-template-columns       : 1fr;
        grid-gap                    : 1rem;
    }

    #meetup-controls {
        margin                      : 1rem;
        display                     : flex;
        justify-content             : space-between;
    }

    #no-meetups {
        margin                      : 1rem;
    }

    @media (min-width: 768px) {
        #meetups {
            grid-template-columns   : repeat(2, 1fr);
        }
    }
</style>

<svelte:head>
    <title>All Meetups</title>
</svelte:head>

{#if editMode === "edit"}
    <EditMeetup id="{editedId}" on:save="{savedMeetup}" on:cancel="{cancelEdit}"/>
{/if}
{#if isLoading}
    <LoadingSpinner />
{:else}
    <section id="meetup-controls">
        <MeetupFilter on:select="{setFilter}"/>
        <Button on:click="{() => dispatch ("add")}">New Meetup</Button>
    </section>
    {#if filteredMeetups.length === 0}
        <p id="no-meetups">No meetups founds, you can start adding some</p>
    {/if}

    <section id="meetups">
        {#each filteredMeetups as meetup (meetup.id)}
            <div transition:scale animate:flip={{duration: 300}}>
                <MeetupItem
                    id="{meetup.id}"
                    title="{meetup.title}"
                    subtitle="{meetup.subtitle}"
                    time="{meetup.time}"
                    address="{meetup.address}"
                    imageUrl="{meetup.imageUrl}"
                    description="{meetup.description}"
                    email="{meetup.contactEmail}"
                    isFav="{meetup.isFavorite}"
                    on:showdetails
                    on:edit
                    />
            </div>
        {/each}
    </section>

{/if}

