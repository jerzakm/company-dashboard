<script>
	import Divider from './Divider.svelte';
</script>

<card class={$$props.class}>
	{#if $$slots.header}
		<div class="py-2">
			<slot name="header" />
		</div>
		<Divider class="mb-2" />
	{/if}

	{#if $$slots.content}
		<div class="my-4">
			<slot name="content" />
		</div>
	{/if}
</card>

<style>
	card {
		background-color: var(--surface-background-color);
		border: 1px solid var(--surface-border-light);
		@apply rounded px-4 py-2;
	}
</style>
