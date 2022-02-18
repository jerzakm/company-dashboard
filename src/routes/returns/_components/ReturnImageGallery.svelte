<!-- <script>
	import Dialog, { Title, Content, Actions } from '@smui/dialog';
	import Button, { Label } from '@smui/button';

	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	let open = false;
	let imgOpen = {};

	import AddNewFile from './AddNewFile.svelte';
	export let returnEntry;
</script>

<gallery>
	<div>
		<AddNewFile
			{returnEntry}
			on:change={() => {
				dispatch('change');
			}}
		/>
	</div>
	{#each returnEntry.images as image}
		<img
			src={image.imgSrc}
			alt={image.description}
			on:click={() => {
				open = true;
				imgOpen = image;
			}}
		/>
	{/each}
</gallery>

<Dialog bind:open aria-labelledby="simple-title" aria-describedby="simple-content">
	<Content id="simple-content">
		<img src={imgOpen.imgSrc} />
	</Content>
</Dialog>

<style lang="scss">
	div {
		width: 100%;
	}
	gallery {
		width: 100%;
		@apply grid;
		@apply grid-cols-4;
	}
	img {
		width: 100%;
	}
</style> -->
