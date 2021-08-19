<script>
	import IconButton from '@smui/icon-button';
	import Button, { Label } from '@smui/button';

	let photo, fileinput;

	const onFileSelected = (e) => {
		let image = e.target.files[0];
		let reader = new FileReader();
		reader.readAsDataURL(image);
		reader.onload = (e) => {
			photo = e.target.result;
		};
	};
</script>

<div>
	{#if photo}
		<img class="photo" src={photo} alt="d" />
		<Button on:click={() => (photo = undefined)}>
			<Label>Usuń</Label>
		</Button>
	{:else}
		<IconButton class="material-icons" style="width: 300px; height:300px; font-size: 150px;" on:click={() => fileinput.click()}
			>add_a_photo</IconButton
		>
	{/if}

	<input style="display:none" type="file" accept=".jpg, .jpeg, .png" on:change={(e) => onFileSelected(e)} bind:this={fileinput} />
</div>

<style>
	.photo {
		width: 300px;
	}
	div {
		display: flex;
		flex-direction: column;
	}
</style>
