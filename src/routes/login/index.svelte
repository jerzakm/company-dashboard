<script lang="ts">
	import Card, { Content, Actions } from '@smui/card';
	import Button, { Label } from '@smui/button';
	import { authenticateUser } from '$lib/auth';
	import Textfield from '@smui/textfield';

	let login = '';
	let password = '';
</script>

<loginForm>
	<Card>
		<Content>
			<Textfield variant="outlined" bind:value={login} label="Login">
				<!-- <HelperText slot="helper">Helper Text</HelperText> -->
			</Textfield>
			<div style="width:100%; height: 1rem" />
			<Textfield variant="outlined" bind:value={password} type="password" label="Hasło">
				<!-- <HelperText slot="helper">Helper Text</HelperText> -->
			</Textfield>
		</Content>
		<Actions fullBleed>
			<Button
				on:click={() => {
					authenticateUser(login, password);
					window.location.href = '/';
				}}
			>
				<Label>Zaloguj się</Label>
				<i class="material-icons" aria-hidden="true">arrow_forward</i>
			</Button>
		</Actions>
	</Card>
</loginForm>

<style>
	loginForm {
		width: 100%;
		min-height: 500px;
		display: flex;
		align-items: center;
		justify-items: center;
		align-content: center;
		justify-content: center;
	}
</style>
