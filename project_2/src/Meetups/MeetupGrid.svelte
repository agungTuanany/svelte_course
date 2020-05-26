<script>
    // Buildin dependencies
    import MeetupItem from "./MeetupItem.svelte"
    import MeetupFilter from "./MeetupFilter.svelte"

    // props
    export let meetups;

    let favsOnly = false

    // Reactive statement
    $: filteredMeetups = favsOnly ?  meetups.filter (m => m.isFavorite) : meetups

    // Instant function
    function setFilter (event) {
        favsOnly = event.detail === 1
    }
</script>

<style>
    #meetups {
        width: 100%;
        display: grid;
        grid-template-columns: 1fr;
        grid-gap: 1rem;
    }

    #meetup-controls {
        margin: 1rem;
    }

    @media (min-width: 768px) {
        #meetups {
            grid-template-columns: repeat(2, 1fr);
        }
    }
</style>

<section class="meetup-controls">
    <MeetupFilter on:select="{setFilter}"/>
</section>

<section id="meetups">
    {#each filteredMeetups as meetup}
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
    {/each}
</section>
