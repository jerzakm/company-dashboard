<script>
	import Input from '$lib/components/core/Input.svelte';

	import { get, post } from '$lib/core/api';
	import { debounce } from '$lib/util/debounce';

	import { onMount } from 'svelte';

	import Select from 'svelte-select';
	export let entry;

	// SALE SOURCE
	let saleSources = [];
	let saleSourceValue;

	async function updateSaleSource(event) {
		await post('returns/edit/saleSource', { returnId: entry.id, saleSourceId: event.detail.value });
	}

	async function removeSaleSource() {
		await post('returns/edit/saleSource', { returnId: entry.id, saleSourceId: undefined });
	}

	function displaySaleSource() {
		const i = saleSources.findIndex((r) => {
			return r.value == entry.saleSourceId;
		});

		if (i >= 0) {
			saleSourceValue = saleSources[i];
		}
	}

	$: saleSources && entry && displaySaleSource();

	// SALE DOCUMENT
	async function saveSaleDocument() {
		const changedDocuments = await post('returns/edit/saleDocument', {
			saleDocument: entry.saleDocument,
			returnId: entry.id
		});
	}
	const saleDocumentChange = debounce(() => saveSaleDocument(), 500);

	onMount(async () => {
		const { data } = await get('returns/dictionary');

		const sources = [];
		data.saleSources.map((s) => {
			sources.push({
				value: s.id,
				label: `${s.subCategory ? s.subCategory : s.name}`,
				group: s.name
			});
		});

		saleSources = sources;
	});

	const groupBy = (item) => item.group;
</script>

<div class="selectTheme transactionDetailsGrid">
	<span>Sale source</span>
	<div>
		<Select
			items={saleSources}
			value={saleSourceValue}
			on:select={updateSaleSource}
			on:clear={removeSaleSource}
			{groupBy}
		/>
	</div>
	<span>Return reason</span>
	<span />
	<span>Sale document</span>
	<div>
		<Input
			bind:value={entry.saleDocument}
			on:change={() => saleDocumentChange()}
			on:input={() => saleDocumentChange()}
		/>
	</div>
	<span>Status</span>
	<span>{entry.resolved}</span>
</div>

<style>
	.selectTheme {
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
	.transactionDetailsGrid {
		grid-template-columns: auto 1fr auto 1fr;
		@apply grid items-center gap-x-16 gap-y-2;
	}
</style>
