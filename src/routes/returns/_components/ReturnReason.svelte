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

	const setReturnReason = async () => {
		const res = await post('returns/edit/returnReason', { returnReason: value, returnId: returnEntry.id });
		dispatch('change');
		return res ? true : false;
	};

	onMount(() => {
		getDictionary();
		value = returnEntry.returnReason;
		console.log(value);
	});
</script>

<div>
	<div style="min-width: 100px;">
		<Button on:click={() => surface.setOpen(true)}
			>{value ? `${value?.category ? `${value.category} - ` : ''} ${value?.reason}` : 'brak'}</Button
		>
		<MenuSurface bind:this={surface} anchorCorner="BOTTOM_LEFT" style="width:400px;">
			{#if dictionary?.returnReasons}
				<div class="flex flex-col p-4 gap-2">
					{#each dictionary.returnReasons as reason}
						<Button
							on:click={() => {
								value = reason;
								surface.setOpen(false);
							}}
							>{reason?.category ? `${reason.category} - ` : ''} {reason.reason}
						</Button>
					{/each}
				</div>
			{/if}
		</MenuSurface>
	</div>

	<SaveChangesButton action={setReturnReason} visible={JSON.stringify(value) != JSON.stringify(returnEntry.returnReason)} />
</div>
