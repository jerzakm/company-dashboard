<script lang="ts">
	import Card, { Content, Actions } from '@smui/card';
	import Button, { Label } from '@smui/button';
	import Textfield from '@smui/textfield';
	import { goto } from '$app/navigation';
	import { session } from '$app/stores';
	import { authenticateUser, authStore } from '$lib/auth';

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
	<title>Logowanie</title>
</svelte:head>

<form on:submit|preventDefault={submit}>
	<Card>
		<Content>
			<Textfield variant="outlined" bind:value={user} label="Użytkownik" name="username">
				<!-- <HelperText slot="helper">Helper Text</HelperText> -->
			</Textfield>
			<div style="width:100%; height: 1rem" />
			<Textfield variant="outlined" bind:value={password} type="password" label="Hasło" name="password">
				<!-- <HelperText slot="helper">Helper Text</HelperText> -->
			</Textfield>
		</Content>
		<Actions fullBleed>
			<Button type="submit">
				<Label>Zaloguj się</Label>
				<i class="material-icons" aria-hidden="true">arrow_forward</i>
			</Button>
		</Actions>
	</Card>
	{#if loginError}
		<p>Błąd</p>
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
</style>
