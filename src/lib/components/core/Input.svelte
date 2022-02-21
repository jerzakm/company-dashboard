<script>
	export let placeholder = '';
	export let value = '';
	export let disabled = false;
	export let showPlaceholder = true;
	export let type = 'text';

	let placeholderStyle = '';
	if (!showPlaceholder) {
		placeholderStyle = '0px auto';
	} else {
		placeholderStyle = '15px auto';
	}
</script>

<div style="grid-template-rows: {placeholderStyle};" class={`${$$props.class}`}>
	{#if showPlaceholder}
		<span class="title">{placeholder}</span>
	{/if}
	<label>
		{#if type == 'password'}
			<input {disabled} bind:value type="password" />
		{:else if type == 'number'}
			<input {disabled} bind:value type="number" />
		{:else}
			<input {disabled} bind:value type="text" />
		{/if}
	</label>
</div>

<style>
	div {
		@apply grid;
		@apply border;
		@apply p-2;
		@apply rounded;
	}
	.title {
		font-size: 10px;
		opacity: 0.5;
		padding-left: 5px;
		justify-self: left;
		@apply -mb-10;
	}
	label {
		display: inline-block;
		position: relative;
		box-sizing: border-box;
		@apply text-base;
	}

	input {
		display: block;
		box-sizing: border-box;
		width: 100%;
		background-color: transparent;
		border-radius: 0;
		border: none;
		font-family: inherit;
		font-size: 1em;
		padding: 0 0 0 6px;
		border-bottom: 2px solid var(--text-color-light);
		transition: border-color 0.35s ease-out;
	}

	input:focus {
		border-bottom: 2px solid var(--primary-color);
		outline: none;
	}
</style>
