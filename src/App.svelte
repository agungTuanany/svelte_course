<script>
	let name = "John"
	let age = 30

	// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/label
	// Label statement in svelte

	$: uppercaseName = name.toUpperCase ()


	function incrementAge () {
		age = age + 1
	}

	// reset to default name variabel
	function  changeName () {
		name = "John Doe"
	}

</script>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		/*color: #ff3e00; */
		color: purple;
		font-size: 4em;
		font-weight: 1rem;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>

<main>
	<h1>Hello {uppercaseName}, your age is {age}!</h1>
	<button on:click="{incrementAge}">Change Age</button>
	<button on:click="{changeName}">Change Name</button>
	<p>Visit the <a href="https://svelte.dev/tutorial">Svelte tutorial</a> to learn how to build Svelte apps.</p>
</main>

