<script lang="ts">
	import { goto } from '$app/navigation';
	import Button from '$lib/components/core/Button.svelte';
	import Input from '$lib/components/core/Input.svelte';
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

<div>
	<form on:submit|preventDefault={submit}>
		<h1 class="text-4xl font-bold mb-4">Log in</h1>
		<!-- <input type="text" name="username" placeholder="username" bind:value={user} /> -->
		<!-- <input type="password" name="password" placeholder="password" bind:value={password} /> -->
		<Input bind:value={user} placeholder="User" class="mb-2" />
		<Input bind:value={password} placeholder="Password" type="password" class="mb-4" />

		<Button size="normal" fullwidth>Login</Button>

		{#if loginError}
			<p>err</p>
		{/if}
	</form>
</div>

<style>
	div {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-items: center;
		align-content: center;
		justify-content: center;
		width: 100%;
		min-height: 70vh;
	}

	p {
		color: red;
		position: absolute;
	}
</style>
