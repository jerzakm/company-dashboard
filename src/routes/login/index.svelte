<script lang="ts">
	import { goto } from '$app/navigation';
	import Button from '$lib/components/core/Button.svelte';
	import Input from '$lib/components/core/Input.svelte';
	import { authenticateUser, authStore } from '$lib/core/auth';
	import { _ } from 'svelte-i18n';

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

<svelte:head>
	<title>{$_('login.pageTitle')}</title>
</svelte:head>

<div>
	<form on:submit|preventDefault={submit}>
		<h1 class="font-bold mb-4">{$_('login.pageTitle')}</h1>
		<Input bind:value={user} placeholder={$_('login.username')} class="mb-2" />
		<Input bind:value={password} placeholder={$_('login.password')} type="password" class="mb-4" />

		<Button size="normal" fullwidth>{$_('login.login')}</Button>

		<p class={loginError ? 'opacity-100' : 'opacity-0 scale-90'}>{$_('login.loginError')}</p>
	</form>
</div>

<style>
	div {
		@apply flex items-center flex-col justify-center;
		@apply w-full;
		min-height: 70vh;
	}

	form {
		@apply w-full;
		max-width: 300px;
		@apply flex;
		@apply flex-col;
	}

	p {
		@apply mt-2;
		transition: ease-in-out 0.1s;
		color: var(--error-color);
	}
</style>
