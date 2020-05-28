<script>
    // ################################################
    let hobbies = []
    let hobbyInput
    let isLoading = false

    // ################################################
    function addHobby () {
        hobbies = [...hobbies, hobbyInput.value]

        isLoading = true
        fetch ("https://svelte-course-57736.firebaseio.com/hobbies.json", {
            method          : "POST",
            body            : JSON.stringify (hobbyInput.value),
            headers         : {
                "Content-Type"      : "application/json"
            }

        }).then (res => {
            isLoading = false
            if (!res.ok) {
                throw new Error ("Responds Failed!")
            }
            // .....
            alert ("Saved Data")
        }).catch (err => {
            isLoading = false
            console.log (err)

        })
    }
</script>

<style>
</style>


<main>
    <label for="hobby">Hobby</label>
    <input type="text" id="hoby" bind:this={hobbyInput}>
    <button on:click={addHobby}>Add</button>

    {#if isLoading}
        <p>Loading....</p>
    {:else}
        <ul>
            {#each hobbies as hobby}
                <li>{hobby}</li>
            {/each}
        </ul>
    {/if}
</main>

