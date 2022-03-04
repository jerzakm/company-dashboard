<script>
	import Button from '$lib/components/core/Button.svelte';
	import Modal from '$lib/components/core/Modal.svelte';

	import { post } from '$lib/core/api';
	import { formatToDateHour } from '$lib/util/time';

	import { createEventDispatcher, onMount } from 'svelte';

	export let entry;

	const dispatch = createEventDispatcher();

	let showModal;
	let modalImageIndex = 0;

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
	<Modal title="Image gallery" bind:showModal class="flex flex-col items-center">
		<img
			src={`/api/images/${entry.images[modalImageIndex].id}.${entry.images[modalImageIndex].extension}`}
			alt={`product or packaging image for return ${entry.id} - ${entry.images[modalImageIndex].description}`}
			class="max-w-full "
		/>

		<close class="fixed top-0 right-4 p-4">
			<Button size="large" on:click={() => (showModal = false)}>X</Button>
		</close>

		<controls class="fixed bottom-0 z-50 m-auto flex flex-col items-center gap-2">
			<div class="flex flex-col items-center">
				<span class="mt-1 px-2 text-xs "
					>Added by <b>{entry.images[modalImageIndex].user.name}</b> on {formatToDateHour(
						entry.images[modalImageIndex].created_at
					)}</span
				>
				<span>{modalImageIndex + 1}/{entry.images.length}</span>
			</div>
			<div class="flex gap-4">
				<Button
					on:click={() => {
						modalImageIndex > 0
							? (modalImageIndex = modalImageIndex - 1)
							: (modalImageIndex = entry.images.length - 1);
						console.log(modalImageIndex);
					}}>&lt Previous</Button
				>
				<Button
					on:click={() => {
						modalImageIndex < entry.images.length - 1
							? (modalImageIndex = modalImageIndex + 1)
							: (modalImageIndex = 0);
						console.log(modalImageIndex);
					}}>Next &gt</Button
				>
			</div>
		</controls>
	</Modal>
	<div class="masonry">
		{#each entry.images as image, i}
			<figure
				class="flex flex-col items-center"
				on:click={() => {
					showModal = true;
					modalImageIndex = i;
				}}
			>
				<img
					src={`/api/images/${image.id}_400.${image.extension}`}
					alt={`product or packaging image for return ${entry.id} - ${image.description}`}
				/>
				<span class="mt-1 px-2 text-xs text-[color:var(--text-color-light)]"
					>Added by <b>{image.user.name}</b> on {formatToDateHour(image.created_at)}</span
				>
			</figure>
		{/each}
	</div>
	<Button
		gradient
		size="large"
		fullwidth
		on:click={() => {
			fileinput.click();
		}}
	>
		<img class="icon mr-2 " src="/icons/takePhoto.png" alt="" />
		<div class="ml-2">Add another</div>
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
	controls {
		background-color: var(--background-color);
	}
</style>
