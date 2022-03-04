<script>
	import Button from './Button.svelte';

	import Divider from './Divider.svelte';

	//
	export let showModal = false;
	export let title = '';
</script>

{#if showModal}
	<div
		class="modal fixed inset-0 flex items-center justify-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none"
	>
		<content>
			<div class="flex justify-between py-2">
				<h3>{title}</h3>
				<Button on:click={() => (showModal = false)}>X</Button>
			</div>
			<Divider class="mb-2" />

			<div class={`my-4 ${$$props.class}`}><slot /></div>
		</content>
	</div>
	<div class="modal-bg fixed inset-0 bg-black opacity-25" />
{/if}

<style>
	.modal {
		z-index: 9999;
		min-width: 40vw;
	}
	.modal-bg {
		z-index: 9990;
	}
	.modal-header {
		@apply text-2xl;
	}

	content {
		background-color: var(--surface-background-color);
		border: 1px solid var(--surface-border-light);
		min-width: 40%;
		@apply rounded px-4 py-2;
	}
</style>
