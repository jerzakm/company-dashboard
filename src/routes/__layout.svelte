<script>
	import SideIcons from '$lib/components/Nav/SideIcons.svelte';
	import '../styles/app.css';

	import { goto } from '$app/navigation';
	import { authStore, checkStoredLogin } from '$lib/core/auth';
	import { onMount } from 'svelte';
	import Topbar from '$lib/components/Nav/Topbar.svelte';

	import '$lib/locale/i18n';

	let user = null;

	authStore.subscribe(async (u) => {
		user = u;
		if (!user) {
			const verified = await checkStoredLogin();
			if (!verified) goto('/login');
		}
	});

	onMount(async () => {
		const verified = await checkStoredLogin();

		if (!verified) goto('/login');
	});
</script>

<div class="flex h-full">
	{#if user}
		<SideIcons />
	{/if}
	<slot />
</div>
