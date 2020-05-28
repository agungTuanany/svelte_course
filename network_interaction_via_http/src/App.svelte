<script>
    let hobbies = []
    let hobbyInput

    function addHobby () {
        hobbies = [...hobbies, hobbyInput.value]

        fetch ("https://svelte-course-57736.firebaseio.com/hobbies.json", {
            method          : "POST",
            body            : JSON.stringify (hobbies),
            headers         : {
                "Content-Type"      : "application/json"
            }

        }).then (res => {
            if (!res.ok) {
                throw new Error ("Responds Failed!")
            }
            // .....
        }).catch (err => {
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

    <ul>
        {#each hobbies as hobby}
            <li>{hobby}</li>
        {/each}
    </ul>
</main>

