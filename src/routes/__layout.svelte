<script lang="ts">
	import Header from '$lib/Menus/Header.svelte';
	import Sidebar from '$lib/Menus/Sidebar.svelte';
	import '../app.css';
	import { onMount } from 'svelte';
	import { goto, invalidate, prefetch, prefetchRoutes } from '$app/navigation';
	import { getStores, navigating, page, session } from '$app/stores';
	import { authStore, verifyUser } from '$lib/auth';

	let verified = false;

	page.subscribe(async (p) => {
		verified = await verifyUser();

		if (p.path != '/login' && !verified) {
			goto('/login');
		}

		if (p.path == '/login' && verified) {
			goto('/');
		}
	});
</script>

<layout>
	{#if verified}
		<Sidebar />
	{/if}
	<main>
		{#if verified}
			<Header />
		{/if}
		<slot />
	</main>
</layout>

<style>
	layout {
		display: flex;
	}
	main {
		flex: 1;
	}
</style>
