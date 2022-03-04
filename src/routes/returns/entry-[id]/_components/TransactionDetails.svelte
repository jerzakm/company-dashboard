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

	// RETURN REASON
	let returnReasons = [];
	let returnReasonValue;

	async function updateReturnReason(event) {
		await post('returns/edit/returnReason', {
			returnId: entry.id,
			returnReasonId: event.detail.value
		});
	}

	async function removeReturnReason() {
		await post('returns/edit/returnReason', { returnId: entry.id, returnReasonId: undefined });
	}

	function displayReturnReason() {
		const i = returnReasons.findIndex((r) => {
			return r.value == entry.returnReasonId;
		});

		if (i >= 0) {
			returnReasonValue = returnReasons[i];
		}
	}

	$: returnReasons && entry && displayReturnReason();

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

		const reasons = [];
		data.returnReasons.map((r) => {
			reasons.push({
				value: r.id,
				label: `${r.reason}`,
				group: r.category
			});
		});

		returnReasons = reasons;
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
	<div>
		<Select
			items={returnReasons}
			value={returnReasonValue}
			on:select={updateReturnReason}
			on:clear={removeReturnReason}
			{groupBy}
		/>
	</div>
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
