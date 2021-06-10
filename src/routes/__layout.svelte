<script lang="ts">
	import Header from '$lib/Menus/Header.svelte';
	import Sidebar from '$lib/Menus/Sidebar.svelte';
	import '../app.css';
	import { onMount } from 'svelte';
	import { goto, invalidate, prefetch, prefetchRoutes } from '$app/navigation';
	import { getStores, navigating, page, session } from '$app/stores';
	import { authStore, verifyUser } from '$lib/auth';

	let authenticated;

	page.subscribe(async (p) => {
		const verified = await verifyUser();

		if (p.path != '/login' && !verified) {
			goto('/login');
		}

		if (p.path == '/login' && verified) {
			goto('/');
		}
	});
</script>

<layout>
	<Sidebar />
	<main>
		<Header />
		<slot />
	</main>
</layout>

<style>
	layout {
		display: flex;
	}
</style>
