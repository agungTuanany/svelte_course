<script>
export let userName
export let jobTitle
export let userImage
export let description
</script>

<style>
	.contact-card {
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
		max-width: 30rem;
		border-radius: 5px;
		margin: 1rem 0;
	}

	header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 7rem;
	}

	.thumb {
		width: 75%;
		height: 100%;
	}

	.thumb-placeholder {
		background: #ccc;
	}

	img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.user-data {
		width: 67%;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	h1 {
		font-size: 1rem;
		font-weight: normal;
		color: #5a5a5a;
		margin: 0;
		margin-bottom: 0.5rem;
	}

	h2 {
		font-size: 1rem;
		font-weight: normal;
		color: #5a5a5a;
		margin: 0;
		margin-bottom: 0.5rem;
	}

	.description {
		border-top: 1px solid #ccc;
		padding: 1rem;
	}

</style>

<!-- markup -->
<div class="contact-card">
	<header>
		<div class="{userImage === true ? "thumb" : "thumb thumb-placeholder"}">
			<img src="{userImage}" alt="">
		</div>
		<div class="user-data">
			<h1>{userName}</h1>
			<h2>{jobTitle}</h2>
		</div>
	</header>
	<div class="description">
		<p>A short description</p>
		<p>{@html description}</p>
	</div>
</div>

<!-- end markup -->
