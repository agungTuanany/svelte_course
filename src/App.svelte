<!--
	Side note:
	Svelte apps are built from multiple "Components" -UI building blocks -UI building blocks.
	It's the same philosophy as in React, Angular & Vue
-->
<script>
//#################################################################
// Dependencies

import ContactCard from "./ContactCard.svelte"
import CourseGoal from "./CourseGoal.svelte"

//#################################################################
// Instant variable
let name = "John"
let age = 30
let title = "Job Title"
let image = "image"
let description = "job descrpition"
let formState = "empty"
let done = false

let courseGoal = "your course goal"

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
function addContact () {
	done = true
}


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
	description = enteredValue
}

function courseGoalInput (event) {
	const enteredValue = event.target.value
	courseGoal = enteredValue
}

</script>

<style>

/*
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
	*/
#form {
	width: 30rem;
	max-width: 100%;
}
</style>

<main>
	<div id="form">
		<div class="form-control">
			<label for="userName">User Name</label>
			<input type="text" value="{name}" on:input={nameInput} id="userName" />
		</div>
		<div class="form-control">
			<label for="jobTitle">Job Title</label>
			<input type="text" value="{title}" on:input={jobInput} id="jobTitle" />
		</div>
		<div class="form-control">
			<label for="image">Image URL</label>
			<input type="text" value="{image}" on:input={imageInput} id="image" />
		</div>
		<div class="form-control">
			<label for="desc">Description</label>
			<input type="text" value="{description}" on:input={jobDescInput} />
		</div>
	</div>

	<button on:click={addContact}>Add Contact Card</button>

	{#if done}
	<ContactCard
		userName="{name}"
		jobTitle="{title}"
		userImage="{image}"
		{description}
	/>
	{/if}

  <p>Visit the <a href="https://svelte.dev/tutorial">Svelte tutorial</a> to learn how to build Svelte apps.</p>
</main>

