<script lang="ts">
	import { authenticateUser } from '$lib/auth';

	let login = 'test';
	let password = 'test';

	const handleOnSubmit = async () => {
		authenticateUser(login, password);
	};
</script>

<form on:submit|preventDefault={handleOnSubmit} class="login-form">
	<label for="login">Użytkownik:</label>
	<input type="text" id="login" name="login" bind:value={login} />
	<label for="password">Hasło:</label><br />
	<input type="password" id="password" name="password" bind:value={password} />
	<button type="submit">Zaloguj się</button>
</form>

<style>
	.login-form {
		display: flex;
		flex-direction: column;
		width: 400px;
	}
</style>
