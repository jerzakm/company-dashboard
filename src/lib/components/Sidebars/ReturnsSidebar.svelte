<script>
	import Button from '$lib/components/core/Button.svelte';
	import Divider from '$lib/components/core/Divider.svelte';
	import { post } from '$lib/core/api';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	import { _ } from 'svelte-i18n';

	export let active = '';

	let underline;

	const links = [
		{
			href: '/returns/list',
			label: $_('returns.list.pageTitle')
		},
		{
			href: '/returns/todo',
			label: $_('returns.todo.pageTitle')
		},
		{
			href: '/returns/locations',
			label: $_('returns.locations.pageTitle')
		},
		{
			href: '/returns/outlet',
			label: $_('returns.outlet.pageTitle')
		}
	];
</script>

<div class="space-y-4">
	<div class="mx-4 space-y-2 ">
		<div class="space-y-1 flex flex-col">
			{#each links as { href, label }}
				<a {href} class={`${active == href ? 'active' : ''}`}>
					<div role="menuitem">
						<span class="truncate">{label}</span>
					</div>
				</a>
			{/each}
		</div>
	</div>
	<Divider />
	<div class="mx-4 space-y-2 ">
		<Button
			gradient
			on:click={async () => {
				try {
					const addedReturn = await post('returns/new');
					dispatch('newReturnEvent', {
						data: addedReturn.data
					});
				} catch (e) {
					console.log(e);
				}
			}}>{$_('returns.actions.addNewEntry')}</Button
		>
	</div>
</div>

<style>
	.active {
		background: linear-gradient(to right, rgba(100, 200, 200, 0), rgba(100, 200, 200, 0)),
			linear-gradient(to left, var(--primary-color), var(--accent-color));
		background-clip: text;
		-webkit-text-fill-color: transparent;
		@apply font-bold;
	}
	a {
		align-self: flex-start;
		text-decoration: none;
		cursor: pointer;
		background: linear-gradient(to right, rgba(100, 200, 200, 0), rgba(100, 200, 200, 0)),
			linear-gradient(to right, var(--primary-color), var(--accent-color), var(--secondary-color));
		background-size: 100% 3px, 0 3px;
		background-position: bottom left;
		background-repeat: no-repeat;
		transition: all cubic-bezier(0.55, 0.055, 0.675, 0.19) 128ms;
		@apply px-1;
	}
	a:hover {
		background-size: 0 18px, 100% 32px;
	}
</style>
