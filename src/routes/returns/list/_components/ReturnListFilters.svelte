<script>
	import Input from '$lib/components/core/Input.svelte';
	import { _ } from 'svelte-i18n';
	import { createEventDispatcher, onMount } from 'svelte';
	import Select from 'svelte-select';
	import { get } from '$lib/core/api';

	const dispatch = createEventDispatcher();

	let query = {
		sender: '',
		product: '',
		returnReasons: null,
		saleSources: null
	};

	let returnReasons = [];
	let saleSources = [];
	let returnReasonValue;
	let saleSourceValue;

	const groupBy = (item) => item.group;

	$: dispatch('filterQuery', query);

	function updateReturnReasonQuery(q) {
		query.returnReasons = q.detail;
	}

	function updateSaleSourceQuery(q) {
		query.saleSources = q.detail;
	}

	onMount(async () => {
		const { data } = await get('returns/dictionary');

		const sources = [];
		data.saleSources.map((s) => {
			sources.push({
				value: s.id,
				label: `${s.subCategory} ${s.name}`,
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
		saleSources = sources;
		returnReasons = reasons;
	});
</script>

<div class="selectTheme flex items-start gap-2 px-2 py-4">
	<Input placeholder={$_('returns.entry.sender.header')} bind:value={query.sender} />
	<Input placeholder={$_('returns.entry.products.header')} bind:value={query.product} />

	<Select
		items={returnReasons}
		value={returnReasonValue}
		containerClasses={'flex-1'}
		isMulti
		placeholder={$_('returns.entry.transactionDetails.returnReason')}
		{groupBy}
		on:select={updateReturnReasonQuery}
		on:clear={updateReturnReasonQuery}
	/>
	<Select
		items={saleSources}
		value={saleSourceValue}
		containerClasses={'flex-1'}
		isMulti
		placeholder={$_('returns.entry.saleSource')}
		{groupBy}
		on:select={updateSaleSourceQuery}
		on:clear={updateSaleSourceQuery}
	/>
</div>
