<script>
	// Table imports - it's used in every route
	import 'handsontable/dist/handsontable.full.css';
	import '$lib/table/_table.css';
	import '$lib/table/_cellRenderers';

	import CoreLayout from '$lib/components/Layout/CoreLayout.svelte';
	import Sidebar from '$lib/components/Nav/Sidebar.svelte';
	import { authStore } from '$lib/core/auth';
	import Topbar from '$lib/components/Nav/Topbar.svelte';

	export let sidebar = true;
	import '$lib/locale/i18n';
	import ReturnsSidebar from '$lib/components/Sidebars/ReturnsSidebar.svelte';
	import Button from '$lib/components/core/Button.svelte';
	import { goto } from '$app/navigation';
	let user = null;

	authStore.subscribe(async (u) => {
		user = u;
	});

	let showReturnNotification = false;
	let animateNotification = false;
	let addedReturnData;

	function newReturnEventHandler(e) {
		addedReturnData = e.detail.data;
		showReturnNotification = true;

		const duration = 10000;

		setTimeout(() => {
			animateNotification = true;
		}, 200);

		setTimeout(() => {
			animateNotification = false;
		}, duration - 500);

		setTimeout(() => {
			showReturnNotification = false;
			addedReturnData = undefined;
		}, duration);
	}
</script>

<CoreLayout>
	{#if user && sidebar}
		<Sidebar>
			<ReturnsSidebar active="/returns/locations" on:newReturnEvent={newReturnEventHandler} />
		</Sidebar>
	{/if}

	<div class={`notification ${showReturnNotification ? 'flex' : 'hidden'}`}>
		<div class={`notification-bg  opacity-10`} />
		<div
			class={`notification-content flex flex-col items-center ${
				animateNotification ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-32;'
			}`}
		>
			{#if addedReturnData}
				<h2>Added a new return</h2>
				<h1 class="mt-2 mb-2 text-8xl">{addedReturnData.id}</h1>
				<Button
					fullwidth
					gradient
					on:click={() => {
						goto(`/returns/entry-${addedReturnData?.id}`);
						showReturnNotification = false;
					}}><span class="text-2xl">Continue</span></Button
				>
			{/if}
		</div>
	</div>

	<main class="z-10 flex w-full flex-1 flex-col overflow-x-hidden" style="max-height: 100vh;">
		<Topbar {user} />

		<content class="flex flex-1 overflow-y-auto " style="max-height: 100vh;">
			<div class="w-full">
				<slot />
			</div>
		</content>
	</main>
</CoreLayout>

<style>
	.notification {
		@apply h-full w-full;
		@apply absolute z-30;
		@apply items-center justify-center;
		transition: 0.5s all;
	}
	.notification-content {
		transition: 1s all cubic-bezier(0.175, 0.885, 0.32, 1.275);
		@apply z-40;
	}
	.notification-bg {
		@apply absolute h-full w-full;
		background-color: var(--text-color-strong);
		opacity: 0.03;
	}
</style>
