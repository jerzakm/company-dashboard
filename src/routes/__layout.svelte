<script lang="ts">
	import Header from '$lib/Menus/Header.svelte';
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

<Header />

<main>
	<slot />
</main>

<footer>
	<p>visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to learn SvelteKit</p>
</footer>

<style>
	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 1rem;
		width: 100%;
		max-width: 1024px;
		margin: 0 auto;
		box-sizing: border-box;
	}

	footer {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 40px;
	}

	footer a {
		font-weight: bold;
	}

	@media (min-width: 480px) {
		footer {
			padding: 40px 0;
		}
	}
</style>
