<script>
	import Button from '$lib/components/core/Button.svelte';

	import { post } from '$lib/core/api';

	import { createEventDispatcher, onMount } from 'svelte';

	export let entry;

	const dispatch = createEventDispatcher();

	let fileinput;

	const onFileSelected = (e) => {
		let image = e.target.files[0];
		let reader = new FileReader();
		reader.readAsDataURL(image);
		reader.onload = async (e) => {
			try {
				const response = await post('images', {
					returnId: entry.id,
					data: e.target.result
				});
				dispatch('newImageAdded');
				fileinput.value = '';
			} catch (e) {
				console.log(e);
			}
		};
	};
</script>

{#if entry}
	<div class="masonry">
		{#each entry.images as image}
			<figure>
				<img src={`/api/images/${image.id}.${image.extension}`} alt="image" />
			</figure>
		{/each}
	</div>
	<Button gradient size="large" fullwidth>
		<img
			class="icon mr-2 "
			src="/icons/takePhoto.png"
			alt=""
			on:click={() => {
				fileinput.click();
			}}
		/>
		<div
			class="ml-2"
			on:click={() => {
				fileinput.click();
			}}
		>
			Add another
		</div>
		<input
			style="display:none"
			type="file"
			accept=".jpg, .jpeg, .png"
			on:change={(e) => onFileSelected(e)}
			bind:this={fileinput}
		/>
	</Button>
{/if}

<style>
	.icon {
		display: flex;
		height: 50px;
		width: 50px;
		cursor: pointer;
		filter: invert();
	}
	.masonry {
		column-count: 3;
		column-gap: 10px;
	}
	figure {
		margin: 0;
		margin-bottom: 10px;
		break-inside: avoid;
	}
	figure > img {
		max-height: 40vh;
	}
</style>
