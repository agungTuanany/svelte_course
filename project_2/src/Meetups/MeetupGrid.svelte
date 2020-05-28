<script>
    // Dependencies
    import { createEventDispatcher } from "svelte"
    import { scale } from "svelte/transition"
    import { flip } from "svelte/animate"

    // Buildin dependencies
    import MeetupItem   from "./MeetupItem.svelte"
    import MeetupFilter from "./MeetupFilter.svelte"
    import Button       from "./../UI/Button.svelte"

    // props
    export let meetups;

    const dispatch = createEventDispatcher ()
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
