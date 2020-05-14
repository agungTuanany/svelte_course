<script>
	let name = "John"
	let age = 30

	// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/label
	// Label statement in svelte
	$: uppercaseName = name.toUpperCase ()

	$: console.log (name)

	// using a dynamic Label statement with if statement
	$: if (name === "John Doe") {
		console.log ("It changes the age")
		age = 25
	}

	function incrementAge () {
		age = age + 1
	}

	// Reset to default name variable
	function  changeName () {
		name = "John Doe"
	}

	// Bind input element
	function nameInput (event) {
		const enteredValue = event.target.value
		name = enteredValue
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
	<!-- <button on:click="{changeName}">Change Name</button> -->
	<!-- <input type="text" value="{name}" on:input="{nameInput}" /> -->

	<!-- XXX This way is NOT RECOMMENDED, cause breaking unidirectional data overflow. In most cases data flow should be clear -->
	<input type="text" bind:value="{name}" />
	<p>Visit the <a href="https://svelte.dev/tutorial">Svelte tutorial</a> to learn how to build Svelte apps.</p>
</main>

