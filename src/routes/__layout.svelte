<script lang="ts">
	import Sidebar from '$lib/Menus/Sidebar.svelte';
	import TopBar from '$lib/Menus/TopBar.svelte';

	import '../app.css';
	import { onMount } from 'svelte';
	import { goto, invalidate, prefetch, prefetchRoutes } from '$app/navigation';
	import { getStores, navigating, page, session } from '$app/stores';
	import { authStore, verifyUser } from '$lib/auth';
	import Drawer, { AppContent, Content, Header, Title, Subtitle } from '@smui/drawer';
	import Button, { Label } from '@smui/button';
	import List, { Item, Text } from '@smui/list';

	let verified = false;

	let open = true;
	let active = 'Gray Kittens';

	function setActive(value) {
		active = value;
	}

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
		<Drawer variant="dismissible" bind:open>
			<Header>
				<Title>Panel</Title>
				<Subtitle>Środowisko testowe</Subtitle>
			</Header>
			<Content>
				<Sidebar />
			</Content>
		</Drawer>
	{/if}

	<!-- <Button on:click={() => (open = !open)}><Label>Toggle Drawer</Label></Button> -->

	<AppContent class="app-content">
		<TopBar />
		<main>
			<slot />
		</main>
	</AppContent>
</layout>

<style>
	layout {
		position: relative;
		display: flex;
		min-height: 100vh;
		border: 1px solid var(--mdc-theme-text-hint-on-background, rgba(0, 0, 0, 0.1));
		overflow: hidden;
		z-index: 0;
	}

	* :global(.app-content) {
		flex: auto;
		overflow: auto;
		position: relative;
		flex-grow: 1;
	}

	main {
		overflow: auto;
		padding: 16px;
		height: 100%;
		box-sizing: border-box;
	}
</style>
