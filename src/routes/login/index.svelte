<script lang="ts">
	import Card, { Content, Actions } from '@smui/card';
	import Button, { Label } from '@smui/button';
	import { authenticateUser } from '$lib/auth';
	import Textfield from '@smui/textfield';

	let login = '';
	let password = '';
	let inProgress = false;
	let error = null;

	async function submit() {
		const user = await authenticateUser(login, password);
	}
</script>

<svelte:head>
	<title>Logowanie</title>
</svelte:head>

<form on:submit|preventDefault={submit}>
	<Card>
		<Content>
			<Textfield variant="outlined" bind:value={login} label="Login" name="username">
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
