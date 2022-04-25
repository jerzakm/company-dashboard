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
		returnReasons: null
	};

	let returnReasons = [];
	let saleSources = [];
	let returnReasonValue;

	const groupBy = (item) => item.group;

	function updateReturnReasonQuery(q) {
		query.returnReasons = q.detail;
		dispatch('filterQuery', query);
	}

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
		saleSources = sources;
		returnReasons = reasons;
	});
</script>

<div class="selectTheme px-2 py-4">
	<div class="grid grid-cols-2 gap-2">
		<Input
			placeholder={$_('returns.entry.sender.header')}
			bind:value={query.sender}
			on:input={() => {
				dispatch('filterQuery', query);
			}}
		/>
		<Input
			placeholder={$_('returns.entry.products.header')}
			bind:value={query.product}
			on:input={() => {
				dispatch('filterQuery', query);
			}}
		/>

		<Select
			items={returnReasons}
			value={returnReasonValue}
			containerClasses={'flex-1'}
			isMulti
			placeholder={$_('returns.list.table.returnReason')}
			{groupBy}
			on:select={updateReturnReasonQuery}
			on:clear={updateReturnReasonQuery}
		/>
	</div>
</div>
