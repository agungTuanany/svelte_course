<!--
	Side note:
	Svelte apps are built from multiple "Components" -UI building blocks -UI building blocks.
	It's the same philosophy as in React, Angular & Vue
-->
<script>
//#################################################################
	// Dependencies

	import ContactCard from "./ContactCard.svelte"

//#################################################################
// Instant variable
let name = "John"
let age = 30
let title = "Job Title"
let image = "image"
let jobDesc = "job descrpition"

//#################################################################
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/label
// Label statement in svelte
$: uppercaseName = name.toUpperCase ()

$: console.log (name)

// using a dynamic Label statement with if statement
$: if (name === "John Doe") {
	console.log ("It changes the age")
	age = 25
}

//#################################################################
function incrementAge () {
	age = age + 1
}

// Reset to default name variable
function  changeName () {
	name = "John Doe"
}

// Set entered value as global
// Bind input element
function nameInput (event) {
	const enteredValue = event.target.value
	name = enteredValue
}

function jobInput (event) {
	const enteredValue = event.target.value
	title = enteredValue
}

function imageInput (event) {
	const enteredValue = event.target.value
	image = enteredValue
}

function jobDescInput (event) {
	const enteredValue = event.target.value
	jobDesc = enteredValue
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

	textarea,
	input {
		display: flex;
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
	<input type="text" value="{title}" on:input="{jobInput}"/>
	<input type="txt" value="{image}" on:input="{imageInput}"/>
	<textarea rows="3" value="{jobDesc}" on:input="{jobDescInput}"/>

	<ContactCard
		userName="{name}"
		jobTitle="{title}"
		userImage="{image}"
		jobDescription="{jobDesc}"
	/>

  <br>
  <br>
  <p>Visit the <a href="https://svelte.dev/tutorial">Svelte tutorial</a> to learn how to build Svelte apps.</p>
</main>

