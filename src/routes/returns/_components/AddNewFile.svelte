<script>
	import { post } from '$lib/api';

	import Button, { Label } from '@smui/button';

	import { createEventDispatcher } from 'svelte';

	export let returnEntry;

	let fileinput;
	let imgSrc;

	const dispatch = createEventDispatcher();

	const onFileSelected = (e) => {
		let image = e.target.files[0];
		let reader = new FileReader();
		reader.readAsDataURL(image);
		reader.onload = (e) => {
			imgSrc = e.target.result;
		};
	};

	const saveImage = async () => {
		let returnId = returnEntry.id;
		const imageUpload = await post('returns/edit/image', { imgSrc, returnId });
		if (imageUpload) {
			dispatch('change');
			imgSrc = '';
		}
	};
</script>

<div id="app">
	<span>Dodaj zdjęcie</span>
	{#if imgSrc}
		<img
			class="image"
			src={imgSrc}
			alt="d"
			on:click={() => {
				fileinput.click();
			}}
		/>
	{:else}
		<img
			class="image"
			src="/img/placeholder.jpg"
			alt="d"
			on:click={() => {
				fileinput.click();
			}}
		/>
	{/if}

	<Button variant="raised" on:click={() => saveImage()}>
		<Label>Zapisz</Label>
	</Button>
	<input style="display:none" type="file" accept=".jpg, .jpeg, .png" on:change={(e) => onFileSelected(e)} bind:this={fileinput} />
</div>

<style>
	#app {
		justify-content: center;
		flex-flow: column;
		@apply p-8;
		@apply flex;
		@apply items-center;
	}

	.image {
		display: flex;
		width: 100%;
		cursor: pointer;
	}
</style>
