<script>
	import Input from '$lib/components/core/Input.svelte';
	import { _ } from 'svelte-i18n';
	import { get, post } from '$lib/core/api';
	import { debounce } from '$lib/util/debounce';

	import { createEventDispatcher, onMount } from 'svelte';

	import Select from 'svelte-select';
	import { notifications } from '$lib/stores/notifications';
	import Badge from '$lib/components/core/Badge.svelte';
	import { checkEntryStatusRequirements } from '$lib/returnLogic/entryStatus';
	import Button from '$lib/components/core/Button.svelte';
	import MissingDataBadges from './MissingDataBadges.svelte';

	const dispatch = createEventDispatcher();

	$: missingData = checkRequiredFields(entry);

	function checkRequiredFields(entry) {
		const requirements = checkEntryStatusRequirements(entry);

		for (const key in requirements) {
			if (!requirements[key]) {
				return true;
			}
		}

		return false;
	}

	export let entry;

	// SHIPPING COMPANY
	let shippingCompanies = [];
	let shippingCompanyValue;

	async function updateShippingCompany(event) {
		if (entry.shippingCompanyId != event.detail.value) {
			try {
				await post('returns/edit/shippingCompany', {
					returnId: entry.id,
					shippingCompanyId: event.detail.value
				});
				notifications.sendNotification(
					$_('returns.entry.notifications.updateShippingCompany'),
					'success'
				);
				dispatch('detailsChanged');
			} catch (e) {
				notifications.sendNotification(
					$_('returns.entry.notifications.updateShippingCompanyErr'),
					'error'
				);
			}
		}
	}

	async function removeShippingCompany() {
		try {
			await post('returns/edit/shippingCompany', { returnId: entry.id, shippingCompanyId: null });
			notifications.sendNotification(
				$_('returns.entry.notifications.removeShippingCompany'),
				'success'
			);
			dispatch('detailsChanged');
		} catch (e) {
			notifications.sendNotification(
				$_('returns.entry.notifications.removeShippingCompanyErr'),
				'error'
			);
		}
	}

	function displayShippingCompany() {
		const i = shippingCompanies.findIndex((r) => {
			return r.value == entry.shippingCompanyId;
		});

		if (i >= 0) {
			shippingCompanyValue = shippingCompanies[i];
		}
	}

	$: shippingCompanies && entry && displayShippingCompany();

	// SALE SOURCE
	let saleSources = [];
	let saleSourceValue;

	async function updateSaleSource(event) {
		if (entry.saleSourceId != event.detail.value) {
			try {
				await post('returns/edit/saleSource', {
					returnId: entry.id,
					saleSourceId: event.detail.value
				});
				notifications.sendNotification(
					$_('returns.entry.notifications.updateSaleSourceSuccess'),
					'success'
				);
				dispatch('detailsChanged');
			} catch (e) {
				notifications.sendNotification(
					$_('returns.entry.notifications.updateSaleSourceErr'),
					'error'
				);
			}
		}
	}

	async function removeSaleSource() {
		try {
			await post('returns/edit/saleSource', { returnId: entry.id, saleSourceId: undefined });
			notifications.sendNotification(
				$_('returns.entry.notifications.removeSaleSourceSuccess'),
				'success'
			);
			dispatch('detailsChanged');
		} catch (e) {
			notifications.sendNotification(
				$_('returns.entry.notifications.removeSaleSourceErr'),
				'error'
			);
		}
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
		try {
			if (entry.returnReasonId != event.detail.value) {
				await post('returns/edit/returnReason', {
					returnId: entry.id,
					returnReasonId: event.detail.value
				});
				notifications.sendNotification(
					$_('returns.entry.notifications.updateReturnReasonSuccess'),
					'success'
				);
				dispatch('detailsChanged');
			}
		} catch (e) {
			notifications.sendNotification(
				$_('returns.entry.notifications.updateReturnReasonErr'),
				'error'
			);
		}
	}

	async function removeReturnReason() {
		try {
			await post('returns/edit/returnReason', { returnId: entry.id, returnReasonId: undefined });
			notifications.sendNotification(
				$_('returns.entry.notifications.removeReturnReasonSuccess'),
				'success'
			);
			dispatch('detailsChanged');
		} catch (e) {
			notifications.sendNotification(
				$_('returns.entry.notifications.removeReturnReasonErr'),
				'error'
			);
		}
	}

	async function changeEntryStatus(entryStatus) {
		try {
			await post('returns/edit/status', {
				returnId: entry.id,
				entryStatus
			});
			dispatch('detailsChanged');
			notifications.sendNotification($_('returns.entry.notifications.changedStatus'), 'success');
		} catch (e) {
			notifications.sendNotification($_('returns.entry.notifications.statusChangeErr'), 'error');
		}
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
		try {
			await post('returns/edit/saleDocument', {
				saleDocument: entry.saleDocument,
				returnId: entry.id
			});

			notifications.sendNotification(
				$_('returns.entry.notifications.updateSaleDocumentSuccess'),
				'success'
			);
			dispatch('detailsChanged');
		} catch (e) {
			notifications.sendNotification(
				$_('returns.entry.notifications.updateSaleDocumentErr'),
				'error'
			);
		}
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
		saleSources = sources;
		returnReasons = reasons;

		const shipping = [];
		data.shippingCompanies.map((s) => {
			shipping.push({
				value: s.id,
				label: s.name,
				group: ''
			});
		});
		shippingCompanies = shipping;
	});

	const groupBy = (item) => item.group;
</script>

<div class="selectTheme transactionDetailsGrid">
	<span>{$_('returns.entry.shippingCompany')}</span>
	<div>
		<Select
			items={shippingCompanies}
			value={shippingCompanyValue}
			on:select={updateShippingCompany}
			on:clear={removeShippingCompany}
			placeholder={$_('ui.select')}
			{groupBy}
		/>
	</div>
	<span>{$_('returns.entry.saleSource')}</span>
	<div>
		<Select
			items={saleSources}
			value={saleSourceValue}
			on:select={updateSaleSource}
			on:clear={removeSaleSource}
			placeholder={$_('ui.select')}
			{groupBy}
		/>
	</div>
	<span>{$_('returns.entry.transactionDetails.returnReason')}</span>
	<div>
		<Select
			items={returnReasons}
			value={returnReasonValue}
			on:select={updateReturnReason}
			on:clear={removeReturnReason}
			placeholder={$_('ui.select')}
			{groupBy}
		/>
	</div>
	<span>{$_('returns.entry.transactionDetails.saleDocument')}</span>
	<div>
		<Input
			bind:value={entry.saleDocument}
			on:change={() => saleDocumentChange()}
			on:input={() => saleDocumentChange()}
		/>
	</div>
	<span>{$_('returns.entry.transactionDetails.status')}</span>
	<div class="flex flex-wrap items-center gap-2">
		{#if entry.resolved}
			<Badge text={$_('returns.entry.transactionDetails.statusResolved')} type="success" />
			<Button
				size="tiny"
				class="opacity-50"
				on:click={() => {
					changeEntryStatus(false);
				}}>{$_('returns.entry.transactionDetails.statusResolveButtonOpen')}</Button
			>
		{:else}
			<Badge text={$_('returns.entry.transactionDetails.statusInProgress')} type="info" />
			<Button
				on:click={() => {
					changeEntryStatus(true);
				}}>{$_('returns.entry.transactionDetails.statusResolveButton')}</Button
			>
		{/if}
	</div>
	<div class="flex flex-wrap">
		<MissingDataBadges {entry} class="flex-wrap" />
	</div>
</div>

<style>
	.transactionDetailsGrid {
		grid-template-columns: 1fr 2fr 1fr 2fr;
		@apply grid items-center gap-x-16 gap-y-2;
	}
	@media (max-width: 960px) {
		.transactionDetailsGrid {
			grid-template-columns: 1fr 2fr;
		}
	}
</style>
