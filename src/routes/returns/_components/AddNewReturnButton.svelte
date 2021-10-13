<script lang="ts">
	import Button, { Label, Icon } from '@smui/button';
	import { goto } from '$app/navigation';
	import { post } from '$lib/api';
	import { defaultCleanReturnEntry } from '../_listUtil';
	import { createEventDispatcher, onMount } from 'svelte';

	const dispatch = createEventDispatcher();

	let display = false;
	let addedId = 0;
	let mounted = false;

	onMount(async () => {
		mounted = true;
	});

	const addNewReturn = async () => {
		console.log('adding new return');
		try {
			const addedReturn = await post('returns/new', defaultCleanReturnEntry());
			if (addedReturn.id) {
				console.log(addedReturn.id);
				addedId = addedReturn.id;
				dispatch('newReturnAdded', { id: addedReturn.id });
				display = true;
			}
		} catch (e) {
			console.log(e);
			alert('Error adding a new return');
		}
	};
</script>

<Button touch variant="raised" on:click={() => addNewReturn()}>
	<Icon class="material-icons">add</Icon>
	<Label>Dodaj nowy</Label>
</Button>

{#if mounted && display}
	<popupContainer class="flex-col lg:flex-row">
		<lottie-player autoplay mode="normal" src="/lottie/confirmAnim.json" />
		<div>
			<h1>Dodano zwrot #{addedId}</h1>
			<buttons>
				<Button
					on:click={() => {
						goto(`/returns/${addedId}`);
					}}
					variant="raised"
				>
					<Label>Edytuj</Label>
				</Button>
				<Button on:click={() => (display = false)} variant="outlined" color="secondary">
					<Label>Zamknij</Label>
				</Button>
			</buttons>
		</div>
	</popupContainer>
{/if}

<style lang="postcss">
	popupContainer {
		@apply mt-4;
		@apply fixed;
		@apply flex;
		@apply items-center;
		@apply top-0;
		@apply left-0;
		@apply justify-center;
		z-index: 9999;
		width: 100%;
		height: 100vh;
		transition: all linear 0.35s;
		background: rgba(255, 255, 255, 0.25);
		backdrop-filter: blur(4px);
	}

	lottie-player {
		max-width: 50%;
		height: unset;
	}
	buttons {
		/* background-color: var(--color-content-bg-color); */
		padding: 2rem;
		@apply flex;
		@apply flex-col;
		@apply gap-2;
		@apply items-center;
	}
</style>
