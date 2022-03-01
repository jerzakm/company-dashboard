<script>
	import { get, post } from '$lib/core/api';

	import { onMount } from 'svelte';

	import Select from 'svelte-select';
	export let entry;

	let items = [];

	let value;

	async function handleSelect(event) {
		await post('returns/edit/saleSource', { returnId: entry.id, saleSourceId: event.detail.value });
	}

	async function handleClear() {
		await post('returns/edit/saleSource', { returnId: entry.id, saleSourceId: undefined });
	}

	function displaySaleSource() {
		const i = items.findIndex((r) => {
			return r.value == entry.saleSourceId;
		});

		if (i >= 0) {
			value = items[i];
		}
	}

	$: items && entry && displaySaleSource();

	onMount(async () => {
		const { data } = await get('returns/saleSources');
		const sources = [];
		console.log(data);
		data.map((s) => {
			sources.push({
				value: s.id,
				label: `${s.subCategory ? s.subCategory : s.name}`,
				group: s.name
			});
		});

		items = sources;
		// value = sources[0];
	});

	const groupBy = (item) => item.group;
</script>

<div class="themed grid grid-cols-4">
	<span>Sale source</span>
	<div>
		<Select
			{items}
			{value}
			on:select={handleSelect}
			on:clear={handleClear}
			containerClasses="test"
			{groupBy}
		/>
	</div>
	<span>Return reason</span>
	<span>x</span>
	<span>Sale document</span>
	<span>x</span>
	<span>Status</span>
	<span>{entry.resolved}</span>
</div>

<style>
	.themed {
		--border: 1px solid var(--text-color-light);
		--borderRadius: 10px;
		--placeholderColor: var(--text-color-strong);
		--background: var(--background-color);
		--listBackground: var(--background-color);
		--listZIndex: 9000;
		--groupTitleColor: var(--color-primary);
		--inputColor: var(--text-color-strong);
		--itemIsActiveBG: var(--primary-color);
		--itemColor: var(--text-color-strong);
		--itemIsActiveColor: var(--text-color-strong);
		--borderFocusColor: var(--primary-color);
		--borderHoverColor: var(--text-color-strong);
		--itemHoverColor: var(--background-color);
		--itemHoverBG: var(--text-color-strong);
	}
</style>
