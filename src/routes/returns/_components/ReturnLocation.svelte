<script>
	import Dialog, { Title, Content } from '@smui/dialog';
	import Button, { Label } from '@smui/button';
	import List, { Item, Text } from '@smui/list';
	import { createEventDispatcher, onMount } from 'svelte';
	import { get, post } from '$lib/api';

	let open = false;

	let locations;

	let lottieWarning;

	export let product;

	const dispatch = createEventDispatcher();

	const getLocations = async () => {
		locations = await get('returns/locations');
		console.log(locations);
	};

	const setProductLocation = async (location) => {
		const request = {
			id: product.id,
			locationId: location.id
		};

		const productLoc = await post('returns/edit/productLocation', request);

		if (productLoc) {
			dispatch('change');
		}
	};

	onMount(() => {
		console.log(product);
		getLocations();
	});
</script>

<Dialog bind:open selection aria-labelledby="list-title" aria-describedby="list-content">
	<Title id="list-title">Przenieś produkt do:</Title>
	<Content id="list-content">
		<List>
			{#if locations}
				{#each locations as location}
					<Item
						on:click={() => {
							// clicked = item;
							setProductLocation(location);
							open = false;
						}}
					>
						<Text>{location.name} - {location.subName}</Text>
					</Item>
				{/each}
			{/if}
		</List>
	</Content>
</Dialog>

<div class="flex items-center">
	<Button on:click={() => (open = true)}>
		<Label>{product.location ? `${product.location.locationInfo.name} ${product.location.locationInfo.subName}` : 'BRAK!'}</Label>
	</Button>
	{#if !product.location}
		<lottie-player
			bind:this={lottieWarning}
			mode="normal"
			src="/lottie/warningAnim.json"
			autoplay
			loop
			style="width: 48px; margin: -1.5rem; transform: translateX(10px); margin-right: 5px;"
		/>
	{/if}
</div>
