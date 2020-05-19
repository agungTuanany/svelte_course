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

	function toggleFavorite (event) {
		const id = event.detail
		const updatedMeetup = { ...meetups.find(m => m.id === id) }
		updatedMeetup.isFavorite = !updatedMeetup.isFavorite
		const meetupIndex = meetups.findIndex(m => m.id === id)
		const updatedMeetups = [...meetups]
		updatedMeetups[meetupIndex] = updatedMeetup
        meetups = updatedMeetups
	}

</script>

<style>
    main {
        margin-top: 5rem;
    }

</style>

<Header/>
<main>
    <Button caption="New Meetup" on:click={() => editMode = "add"} />
    {#if editMode === "add"}
        <EditMeetup />
    {/if}
    <MeetupGrid {meetups} on:toggle-fav="{toggleFavorite}"/>

</main>

