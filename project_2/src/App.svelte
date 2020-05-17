<script>
    import Header       from "./UI/Header.svelte"
    import MeetupGrid   from "./Meetups/MeetupGrid.svelte"

    // ####################################################
    let title       = ""
    let subtitle    = ""
    let time        = ""
    let imageUrl    = ""
    let address     = ""
    let email       = ""
    let description = ""


    let meetups = [
        {
            id              : "meetup1",
            title           : "Frontend Development with SvelteJS",
            subtitle        : "Create a todo with svelte",
            time            : "16:00 GMT",
            description     : "In this meetup, we will have some exprets talks about front-end development",
            imageUrl        :  "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Svelte_Logo.svg/1200px-Svelte_Logo.svg.png",
            address         : "27th Munchies Road, 22441 New Mark",
            contactEmail    : "code@test.com"
        },
        {
            id              : "meetup2",
            title           : "Backend with hapiJS",
            subtitle        : "Why hapiJS not express?",
            time            : "16:00 GMT",
            description     : "In this meetup, we talk about back-end development",
            imageUrl        : "https://blog.newrelic.com/wp-content/uploads/hapijs.jpg",
            address         : "27th Munchies Road, 22441 New Mark",
            contactEmail    : "codeExpress@test.com"
        },
    ]

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
</script>

<style>
    main {
        margin-top: 5rem;
    }
</style>

    <Header/>
<main>
    <form on:submit|preventDefault="{addMeetup}" action="" method="post">
        <div class="form-control">
            <label for="title">Title</label>
            <input type="text" name="" id="title" bind:value="{title}">
        </div>
        <div class="form-control">
            <label for="subtitle">Subtitle</label>
            <input type="text" name="" id="subtitle" bind:value="{subtitle}">
        </div>
        <div class="form-control">
            <label for="time">Time</label>
            <input type="text" name="" id="time" bind:value="{time}">
        </div>
        <div class="form-control">
            <label for="imageUrl">Image URL</label>
            <input type="text" name="" id="imageUrl" bind:value="{imageUrl}">
        </div>
        <div class="form-control">
            <label for="address">Address</label>
            <input type="text" name="" id="address" bind:value="{address}">
        </div>
        <div class="form-control">
            <label for="email">Contact Email</label>
            <input type="text" name="" id="email" bind:value="{email}">
        </div>
        <div class="form-control">
            <label for="description">Description</label>
            <textarea name="" id="description" rows="8" cols="40" bind:value="{description}"></textarea>
        </div>
        <button type="submit">Save</button>
    </form>
    <!-- <MeetupGrid meetup="{meetup}" /> -->
    <MeetupGrid {meetups}/>

</main>

