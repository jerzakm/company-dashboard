<script>
	import SideIcons from '$lib/components/Nav/SideIcons.svelte';
	import '../styles/app.css';

	import { goto } from '$app/navigation';
	import { authStore, checkStoredLogin } from '$lib/core/auth';
	import { onMount } from 'svelte';
	import Topbar from '$lib/components/Nav/Topbar.svelte';
	import Sidebar from '$lib/components/Nav/Sidebar.svelte';

	let user = null;
	let mounted = false;

	authStore.subscribe(async (u) => {
		user = u;
		if (!user) {
			const verified = await checkStoredLogin();
			if (!verified) goto('/login');
		}
	});

	onMount(async () => {
		mounted = true;
		const verified = await checkStoredLogin();

		if (!verified) goto('/login');
	});
</script>

<div class="flex h-full">
	{#if user}
		<SideIcons />
	{/if}
	<Sidebar />
	<main class="w-full flex flex-col flex-1 overflow-x-hidden" style="max-height: 100vh;">
		<Topbar {user} />
		<div class="flex flex-col flex-1 overflow-y-auto">
			<content class="flex-1 overflow-y-auto" style="max-height: 100vh;">
				<slot />
			</content>
		</div>
	</main>
</div>
