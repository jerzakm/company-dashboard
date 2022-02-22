<script>
	import Divider from '$lib/components/core/Divider.svelte';
	import { onMount } from 'svelte';

	export let active = 'returnsList';

	let underline;

	const links = [
		{
			href: '/returns/list',
			label: 'All returns'
		},
		{
			href: '/returns/todo',
			label: 'Need attention'
		},
		{
			href: '/returns/locations',
			label: 'By location'
		},
		{
			href: '/returns/outlet',
			label: 'Outlet'
		}
	];

	onMount(() => {
		const aEls = document.querySelectorAll('.sidebarlink');
		const links = [];

		const underline = document.querySelector('.underline');
	});
</script>

<div class="space-y-4">
	<div class="mx-4 space-y-2">
		<div class="mx-4 w-full flex">
			<span class="">Returns list</span>
		</div>
		<div class="space-y-1 flex flex-col">
			{#each links as { href, label }}
				<a class=" flex-none" {href}>
					<div class="" role="menuitem">
						<span class="sidebarlink truncate">{label}</span>
					</div>
				</a>
			{/each}
		</div>
	</div>
	<Divider />
</div>

<style>
	a {
		align-self: flex-start;
		text-decoration: none;
		cursor: pointer;
		background: linear-gradient(to right, rgba(100, 200, 200, 0), rgba(100, 200, 200, 0)),
			linear-gradient(to right, var(--primary-color), var(--accent-color), var(--secondary-color));
		background-size: 100% 3px, 0 3px;
		background-position: center left;
		background-repeat: no-repeat;
		transition: all cubic-bezier(0.55, 0.055, 0.675, 0.19) 128ms;
		@apply px-1;
	}
	a:hover {
		background-size: 0 18px, 100% 55px;
	}
</style>
