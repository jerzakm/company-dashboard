<script lang="ts">
	import Card, { Content, Actions } from '@smui/card';
	import Button, { Label } from '@smui/button';
	import Textfield from '@smui/textfield';
	import { authStore, signIn } from '$lib/firebase';
	import { goto } from '$app/navigation';
	import { session } from '$app/stores';

	let user = '';
	let password = '';

	authStore.subscribe((u) => {
		if (u) goto('/');
	});

	async function submit() {
		const creds = await signIn(user, password);
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
</form>

<style>
	form {
		width: 100%;
		min-height: 500px;
		display: flex;
		align-items: center;
		justify-items: center;
		align-content: center;
		justify-content: center;
	}
</style>
