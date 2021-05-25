<script lang="ts">
	let login = 'test';
	let password = 'test';

	const handleOnSubmit = async () => {
		const response = await fetch('/api/auth/login', {
			method: 'POST', // *GET, POST, PUT, DELETE, etc.
			mode: 'same-origin', // no-cors, *cors, same-origin
			cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
			credentials: 'same-origin', // include, *same-origin, omit
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json'
			},
			redirect: 'follow', // manual, *follow, error
			referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
			body: JSON.stringify({ login, password }) // body data type must match "Content-Type" header
		});
		const res = await response.text();
		console.log(res);
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
