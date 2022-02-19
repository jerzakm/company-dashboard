<script lang="ts">
	import { goto } from '$app/navigation';
	import { session } from '$app/stores';
	import { authenticateUser, authStore } from '$lib/core/auth';

	let user = '';
	let password = '';

	let loginError: boolean = false;

	authStore.subscribe((u) => {
		if (u && typeof window != undefined) goto('/');
	});

	async function submit() {
		const auth = await authenticateUser(user, password);
		if (auth.user) {
			loginError = false;
		} else {
			loginError = true;
		}
	}
</script>

<form on:submit|preventDefault={submit}>
	<input type="text" name="username" placeholder="username" bind:value={user} />
	<input type="password" name="password" placeholder="password" bind:value={password} />

	<button>Login</button>

	{#if loginError}
		<p>err</p>
	{/if}
</form>

<style>
	form {
		width: 100%;
		min-height: 500px;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-items: center;
		align-content: center;
		justify-content: center;
	}
	p {
		color: red;
	}
	input {
		background-color: black;
	}
</style>
