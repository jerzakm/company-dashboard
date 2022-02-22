<script>
	import Sidebar from '$lib/components/Nav/Sidebar.svelte';
	import SideIcons from '$lib/components/Nav/SideIcons.svelte';

	import { goto } from '$app/navigation';
	import { authStore, checkStoredLogin } from '$lib/core/auth';
	import { onMount } from 'svelte';
	import Topbar from '$lib/components/Nav/Topbar.svelte';

	export let sidebar = true;

	let user = null;

	authStore.subscribe(async (u) => {
		user = u;
	});
</script>

{#if user && sidebar}
	<Sidebar>
		<slot name="sidebar" />
	</Sidebar>
{/if}

<main class="w-full flex flex-col flex-1 overflow-x-hidden" style="max-height: 100vh;">
	<Topbar {user} />
	<content class="flex flex-1 overflow-y-auto " style="max-height: 100vh;">
		<slot name="content" />
	</content>
</main>
