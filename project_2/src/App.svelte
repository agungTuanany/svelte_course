<script>
    import Header       from "./UI/Header.svelte"
    import MeetupGrid   from "./Meetups/MeetupGrid.svelte"

    const meetups = [
        {
            id              : "meetup1",
            title           : "Frontend Development with SvelteJS",
            subtitle        : "Create a todo with svelte",
            description     : "In this meetup, we will have some exprets talks about front-end development",
            imageUrl        :  "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Svelte_Logo.svg/1200px-Svelte_Logo.svg.png",
            time            : "16:00 GMT",
            address         : "27th Munchies Road, 22441 New Mark",
            contactEmail    : "code@test.com"
        },
        {
            id              : "meetup2",
            title           : "Backend with hapiJS",
            subtitle        : "Why hapiJS not express?",
            description     : "In this meetup, we talk about back-end development",
            imageUrl        : "https://blog.newrelic.com/wp-content/uploads/hapijs.jpg",
            time            : "16:00 GMT",
            address         : "27th Munchies Road, 22441 New Mark",
            contactEmail    : "codeExpress@test.com"
        },
    ]
</script>

<style>
    main {
        margin-top: 5rem;
    }
</style>

    <Header/>
<main>
    <!-- <MeetupGrid meetup="{meetup}" /> -->
    <MeetupGrid {meetups}/>

</main>

