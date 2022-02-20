<script>
	export let type = 'primary';
	export let flat = false;
	export let inverse = false;
	export let size = 'normal';
</script>

<button
	class={type}
	class:tiny={size == 'tiny'}
	class:small={size == 'small'}
	class:normal={size == 'normal'}
	class:large={size == 'large'}
	on:click
>
	<slot />
</button>

<style>
	button {
		color: var(--text-color-strong);
		border-color: var(--text-color-light);
		@apply m-0;
		@apply border;
		@apply rounded;
		@apply inline-flex;
		@apply justify-center;
		@apply relative;
		@apply cursor-pointer;
		@apply items-center;
		@apply transition-all duration-200;
	}
	button:hover {
		color: var(--background-color);
		border-color: var(--text-color-strong);
		background-color: var(--text-color-strong);
	}

	button:active {
		transition-timing-function: cubic-bezier(0, 0, 0, 1);
		transform: scale(0.9);
	}

	.tiny {
		padding: 0.29rem 0.625rem;
		font-size: 0.6rem;
		line-height: 1rem;
	}
	.small {
		padding: 0.375rem 0.625rem;
		font-size: 0.75rem;
		line-height: 1rem;
	}
	.normal {
		padding: 0.425rem 0.667rem;
		font-size: 1rem;
		line-height: 1rem;
	}
	.large {
		padding: 0.85rem 1rem;
		font-size: 1.75rem;
		line-height: 1rem;
	}
</style>
