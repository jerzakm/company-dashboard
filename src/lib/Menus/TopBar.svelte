<script lang="ts">
	import { signOut } from '$lib/auth';
	import Button, { Label, Icon } from '@smui/button';
	import MenuSurface from '@smui/menu-surface';
	import { onMount, getContext } from 'svelte';

	const toggleMenu: any = getContext('toggleMenu');

	export let user;
	let surface;

	onMount(() => {
		// userName = getUser().name;
	});
</script>

<header>
	<div class="corner" />
	<userMenu>
		<Button color="secondary" on:click={() => surface.setOpen(true)}>
			<Label>{user.name}</Label>
			<Icon class="material-icons">account_circle</Icon>
		</Button>

		<MenuSurface bind:this={surface} anchorCorner="BOTTOM_START">
			<div style="margin: 1rem; display: flex; flex-direction: column; align-items: flex-end;">
				<Button style="margin-top: 1em;" on:click={() => signOut()}>Wyloguj</Button>
			</div>
		</MenuSurface>
		<Button on:click={() => toggleMenu()}>
			<Label><Icon class="material-icons">menu</Icon></Label>
		</Button>
	</userMenu>
</header>

<style>
	userMenu {
		margin-right: 1rem;
	}
	header {
		display: flex;
		justify-content: space-between;
		width: 100%;

		position: sticky;
		top: 0;
		z-index: 2;
	}

	.corner {
		width: 3em;
		height: 3em;
	}
</style>
