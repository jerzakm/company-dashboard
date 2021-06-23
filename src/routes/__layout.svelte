<script lang="ts">
	import Sidebar from '$lib/Menus/Sidebar.svelte';
	import TopBar from '$lib/Menus/TopBar.svelte';

	import '../app.css';
	import { goto } from '$app/navigation';
	import { authStore } from '$lib/firebase';
	import Drawer, { AppContent, Content, Header, Title, Subtitle } from '@smui/drawer';

	let user = null;

	authStore.subscribe((u) => {
		user = u;
		if (!u) goto('/login');
	});

	let open = true;
</script>

<layout>
	{#if user}
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
		{#if user}
			<TopBar {user} />{/if}
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
