<script>
	import Dialog, { Title, Content } from '@smui/dialog';
	import Button, { Label } from '@smui/button';
	import List, { Item, Text } from '@smui/list';
	import { onMount } from 'svelte';
	import { get } from '$lib/api';

	let open = false;
	let clicked = 'Nothing yet.';

	let locations;

	let lottieSuccess;

	export let product;

	const getLocations = async () => {
		locations = await get('returns/locations');
		console.log(locations);
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
							clicked = item;
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
		<Label>{product.location ? 'lok' : 'BRAK!'}</Label>
	</Button>
	<lottie-player
		bind:this={lottieSuccess}
		mode="normal"
		src="/lottie/warningAnim.json"
		autoplay
		loop
		style="width: 48px; margin: -1.5rem; transform: translateX(10px); margin-right: 5px;"
	/>
</div>
