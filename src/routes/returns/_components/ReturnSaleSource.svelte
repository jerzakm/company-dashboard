<script>
	import { get, post } from '$lib/api';
	import { onMount, createEventDispatcher } from 'svelte';
	import SaveChangesButton from './SaveChangesButton.svelte';

	import MenuSurface from '@smui/menu-surface';
	import Button from '@smui/button';

	let surface;
	let value;
	let dictionary;

	const dispatch = createEventDispatcher();

	export let returnEntry;

	const getDictionary = async () => {
		dictionary = await get('returns/dictionary');
		console.log(dictionary);
	};

	const setSaleSource = async () => {
		const res = await post('returns/edit/saleSource', { saleSource: value, returnId: returnEntry.id });
		dispatch('change');
		return res ? true : false;
	};

	onMount(() => {
		getDictionary();
		value = returnEntry.saleSource;
	});
</script>

<div>
	<div style="min-width: 100px;">
		<Button on:click={() => surface.setOpen(true)}
			>{value ? `${value?.name} ${value?.subCategory ? `- ${value.subCategory}` : ''}` : 'brak źródła sprzedaży'}</Button
		>
		<MenuSurface bind:this={surface} anchorCorner="BOTTOM_LEFT">
			{#if dictionary?.saleSources}
				<div class="flex flex-col p-4 gap-2">
					{#each dictionary.saleSources as source}
						<Button
							on:click={() => {
								value = source;
								surface.setOpen(false);
							}}>{source.name} {source?.subCategory ? `- ${source.subCategory}` : ''}</Button
						>
					{/each}
				</div>
			{/if}
		</MenuSurface>
	</div>

	<SaveChangesButton action={setSaleSource} visible={JSON.stringify(value) != JSON.stringify(returnEntry.saleSource)} />
</div>
