<script>
	import CoreLayout from '$lib/components/Layout/CoreLayout.svelte';
	import Sidebar from '$lib/components/Nav/Sidebar.svelte';

	import { authStore } from '$lib/core/auth';
	import Topbar from '$lib/components/Nav/Topbar.svelte';

	export let sidebar = true;
	import '$lib/locale/i18n';
	import ReturnsSidebar from '$lib/components/Sidebars/ReturnsSidebar.svelte';
	let user = null;

	authStore.subscribe(async (u) => {
		user = u;
	});
</script>

<CoreLayout>
	{#if user && sidebar}
		<Sidebar>
			<ReturnsSidebar active="/returns/locations" />
		</Sidebar>
	{/if}

	<main class="w-full flex flex-col flex-1 overflow-x-hidden" style="max-height: 100vh;">
		<Topbar {user} />
		<content class="flex flex-1 overflow-y-auto " style="max-height: 100vh;">
			<div class="w-full">
				<slot />
			</div>
		</content>
	</main>
</CoreLayout>
