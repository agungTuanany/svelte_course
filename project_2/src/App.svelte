<script>
    import Header       from "./UI/Header.svelte"
    import MeetupItem   from "./Meetups/MeetupItem.svelte"

    const meetups = [
        {
            id              : "meetup1",
            title           : "Learn to code",
            description     : "In this meetup, we will have some exprets talks about front-end development",
            imageUrl        : "",
            time            : "16:00 GMT",
            address         : "27th Munchies Roead, 22441 New Mark",
            contactEmail    : "code@test.com"
        },
        {
            id              : "meetup2",
            title           : "Learn to code",
            description     : "In this meetup, we talk about back-end development",
            imageUrl        : "",
            time            : "16:00 GMT",
            address         : "27th Munchies Roead, 22441 New Mark",
            contactEmail    : "codeExpress@test.com"
        },
    ]
</script>

<style>
    #meetups {
        margin-top: 5rem;
    }

</style>

<main>
    <Header />

    <section id="meetups">
        {#each meetups as meetup}
            <MeetupItem />
        {/each}
    </section>

</main>

