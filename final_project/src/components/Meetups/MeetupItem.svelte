<script>
    // Dependencies
    import { createEventDispatcher } from "svelte";

    // Buildin dependencies
    import Button from "./../UI/Button.svelte";
    import Badge from "./../UI/Badge.svelte";
    import meetups from "./../../store/meetup-store.js";
    import LoadingSpinner from "./../UI/LoadingSpinner.svelte";

    // ############################################
    // {{{ Props
    export let id;
    export let title;
    export let subtitle;
    export let time;
    export let imageUrl;
    export let description;
    export let address;
    export let email;
    export let isFav;
    // }}}

    const dispatch = createEventDispatcher();

    let isLoading = false;

    // ############################################
    // Instant function
    function toggleFavorite() {
        //{{{
        isLoading = true;
        fetch(`https://svelte-course-57736.firebaseio.com/meetups/${id}.json`, {
            method: "PATCH",
            body: JSON.stringify({ isFavorite: !isFav }),
            headers: { "Content-Type": "application/json" },
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error(
                        "PATCH toggle favorite through server failed"
                    );
                }
                // Update toggleFavortive into firebase (server)
                isLoading = false;
                meetups.toggleFavorite(id);
            })
            .catch((err) => {
                isLoading = false;
                console.log(err);
            });
    } //}}}
</script>

<article>
    <header>
        <h1>
            {title}
            {#if isFav}
                <Badge>FAVORITE</Badge>
            {/if}
        </h1>
        <h2>{subtitle}</h2>
        <h3>{time}</h3>
        <p>{address}</p>
    </header>
    <div class="image">
        <img src={imageUrl} alt={title} />
    </div>
    <div class="content">
        <p>{description}</p>
    </div>
    <footer>
        <Button
            mode="outline"
            type="button"
            on:click={() => dispatch("edit", id)}>Edit</Button
        >
        {#if isLoading}
            <!-- <LoadingSpinner /> -->
            <span>Changing...</span>
        {:else}
            <Button href="/{id}">Show Details</Button>
            <Button
                mode="outline"
                color={isFav ? null : "success"}
                type="button"
                on:click={toggleFavorite}
            >
                {isFav ? "Unfavorite" : "Favorite"}
            </Button>
        {/if}
    </footer>
</article>

<style>
    /* {{{ */
    article {
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
        border-radius: 5px;
        background: white;
        margin: 1rem;
    }

    header,
    .content,
    footer {
        padding: 1rem;
    }

    .image {
        width: 100%;
        height: 14rem;
    }

    .image img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    h1 {
        font-size: 1.25rem;
        margin: 0.5rem 0;
        font-family: "Roboto Slab", sans-serif;
    }

    h1.is-favorite {
        background: #10a129;
        color: white;
        padding: 0 0.5rem;
        border-radius: 5px;
    }

    h2 {
        font-size: 1rem;
        color: #808080;
        margin: 0.5rem 0;
    }

    h3 {
        font-size: 0.85rem;
        color: #808080;
        margin: 0.5rem 0;
    }

    div {
        text-align: center;
    }

    .content {
        height: 4rem;
    }
    /* }}} */
</style>
