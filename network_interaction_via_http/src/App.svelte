<script>
    import { onMount } from "svelte";
    import hobbyStore from "./hobby-store.js";

    // ################################################
    let hobbies = [];
    let hobbyInput;
    let isLoading = false;

    // ################################################
    // Fetching data on initial load with onMount svelte method
    onMount(() => {
        isLoading = true;
        // ################################################
        // Fetching data from firebase
        fetch("https://svelte-course-57736.firebaseio.com/hobbies.json")
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Fetching Firebase Failed");
                }
                // ....
                return res.json();
            })
            .then((data) => {
                isLoading = false;
                // 1. common extracting data with fetch Object.values
                // hobbies = Object.values (data)
                hobbyStore.setHobbies(Object.values(data));

                // 2. Using unique id's
                let keys = Object.keys(data);
                console.log(keys);

                // 3.Using for in loop
                for (let key in data) {
                    console.log(key, data[key]);
                    //    hobbies =  data [key]
                }
            })
            .catch((err) => {
                isLoading = false;
                console.log(err);
            });
    });

    /*{{{ Using await block*/
    // XXX Using await block
    // isLoading = true;
    // // ################################################
    // // Fetching data from firebase
    // let getHobbies = fetch(
    //     "https://svelte-course-57736.firebaseio.com/hobbies.json"
    // )
    //     .then((res) => {
    //         if (!res.ok) {
    //             throw new Error("Fetching Firebase Failed");
    //         }
    //         // ....
    //         return res.json();
    //     })
    //     .then((data) => {
    //         isLoading = false;
    //         // 1. common extracting data with fetch Object.values
    //         hobbies = Object.values(data);
    //
    //         // 2. Using unique id's
    //         let keys = Object.keys(data);
    //         console.log(keys);
    //
    //         // 3.Using for in loop
    //         for (let key in data) {
    //             console.log(key, data[key]);
    //             //    hobbies =  data [key]
    //         }
    //         return hobbies;
    //     })
    //     .catch((err) => {
    //         isLoading = false;
    //         console.log(err);
    //     });
    /*}}}*/

    function addHobby() {
        // hobbies = [...hobbies, hobbyInput.value]
        hobbyStore.addHobby(hobbyInput.value);

        isLoading = true;
        fetch("https://svelte-course-57736.firebaseio.com/hobbies.json", {
            method: "POST",
            body: JSON.stringify(hobbyInput.value),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => {
                isLoading = false;
                if (!res.ok) {
                    throw new Error("Responds Failed!");
                }
                // .....
                alert("Saved Data");
                // res.json () ===> Promise with an object that contains the id
            })
            .catch((err) => {
                isLoading = false;
                console.log(err);
            });
    }
</script>

<main>
    <label for="hobby">Hobby</label>
    <input type="text" id="hoby" bind:this={hobbyInput} />
    <button on:click={addHobby}>Add</button>

    {#if isLoading}
        <p>Loading....</p>
    {:else}
        <ul>
            {#each $hobbyStore as hobby}
                <li>{hobby}</li>
            {/each}
        </ul>
    {/if}

    <!--
        {#await getHobbies}
            <p>Loading</p>
        {:then hobbyData}
            <ul>
            {#each hobbies as hobby}
                <li>{hobby}</li>
            {/each}
            </ul>
        {:catch error}
            <p>{error.message}</p>
        {/await}
    -->
</main>

<style>
</style>
