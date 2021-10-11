<script lang="ts">
	import Sidebar from '$lib/Menus/Sidebar.svelte';
	import TopBar from '$lib/Menus/TopBar.svelte';
	import Button, { Label, Icon } from '@smui/button';
	import Fab from '@smui/fab';

	import { goto } from '$app/navigation';
	import { authStore, checkStoredLogin } from '$lib/auth';
	import Drawer, { AppContent, Content, Header, Title, Subtitle } from '@smui/drawer';
	import { onMount, setContext } from 'svelte';

	let user = null;
	let mounted = false;

	authStore.subscribe(async (u) => {
		user = u;
		if (!user && typeof window != undefined && mounted) {
			const verified = await checkStoredLogin();
			if (!verified) goto('/login');
		}
	});

	onMount(async () => {
		mounted = true;
		const verified = await checkStoredLogin();
		if (!verified) goto('/login');
	});

	let open = true;

	function notification(type, content) {
		alert(`${type} ${content}`);
	}

	function toggleMenu() {
		open = !open;
	}

	setContext('notification', notification);
</script>

<svelte:head>
	<!-- Fonts and CSS -->
	<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
	<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,600,700" />
	<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto+Mono" />

	<!-- smui -->
	<link rel="stylesheet" href="/smui.css" />
	<!-- app -->
	<link rel="stylesheet" href="/styles/app.css" />
	<!-- tailwind -->
	<link rel="stylesheet" href="/styles/tailwind-output.css" />
	<!-- <link rel="stylesheet" href="/smui-dark.css" media="screen and (prefers-color-scheme: dark)" /> -->
</svelte:head>

<layout>
	{#if user}
		<Drawer variant="dismissible" fixed={false} bind:open style={`position: fixed; ${window?.innerWidth < 800 ? 'width: 100%;' : ''}`}>
			<Header>
				<Title>Panel</Title>
				<Subtitle>Środowisko testowe</Subtitle>
			</Header>
			<Content>
				<Sidebar />
			</Content>
		</Drawer>
	{/if}

	<AppContent class="app-content">
		{#if user}
			<TopBar {user} />{/if}

		<main>
			<slot />
		</main>
	</AppContent>
</layout>

<menuToggle>
	{#if open}
		<Fab on:click={() => toggleMenu()}><Icon class="material-icons">close</Icon></Fab>
	{:else}
		<Fab on:click={() => toggleMenu()}><Icon class="material-icons">menu</Icon></Fab>
	{/if}
</menuToggle>

<style>
	menuToggle {
		position: fixed;
		right: 1rem;
		bottom: 1rem;
	}
	@media (min-width: 900px) {
		menuToggle {
			display: none;
		}
	}
	layout {
		position: relative;
		display: flex;
		flex-direction: column;
		min-height: 100vh;
		border: 1px solid var(--mdc-theme-text-hint-on-background, rgba(0, 0, 0, 0.1));
		overflow: hidden;
		z-index: 0;
	}

	* :global(.app-content) {
		flex: auto;
		/* overflow: auto; */
		position: relative;
		flex-grow: 1;
	}

	main {
		/* overflow: auto; */
		padding: 16px;
		height: 100%;
		box-sizing: border-box;
	}
</style>
