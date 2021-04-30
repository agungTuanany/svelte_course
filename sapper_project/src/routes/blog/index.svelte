<script context="module">
    /*
     * this.fetch() is provided by sappers work on server and client side
     * preload() can run both in server and client side
     */
    export function preload({ params, query }) {
        console.log("Preloading....");
        return this.fetch(`blog.json`)
            .then((r) => r.json())
            .then((posts) => {
                return { posts: posts };
            });
    }
</script>

<script>
    import { onMount } from "svelte";

    export let posts;

    /*
     * This preload on server side is happen on purpose because need to hydrate pre-rendered DOM
     * which is ship from the server to the client side,
     *
     * fetch() is a (API) function build into JavaScript only in client side (browser) not into nodeJS.
     * Cause on nodeJS there is no fetch function.
     */

    // This preload run on server and client side
    console.log("Executed from server");

    onMount(() => {
        // onMount only run on client side
        // fetch ()
        console.log("mounted into client side only");
    });
</script>

<svelte:head>
    <title>Blog</title>
</svelte:head>

<h1>Recent posts</h1>

<ul>
    {#each posts as post}
        <!-- we're using the non-standard `rel=prefetch` attribute to
            tell Sapper to load the data for the page as soon as
            the user hovers over the link or taps it, instead of
            waiting for the 'click' event -->
        <li><a rel="prefetch" href="blog/{post.slug}">{post.title}</a></li>
    {/each}
</ul>

<style>
    ul {
        margin: 0 0 1em 0;
        line-height: 1.5;
    }
</style>
