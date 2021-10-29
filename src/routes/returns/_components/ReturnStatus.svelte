<script>
	import { createEventDispatcher, onMount } from 'svelte';
	import { get, post } from '$lib/api';
	import Button, { Label } from '@smui/button';
	import DataTable, { Head, Body, Row, Cell } from '@smui/data-table';
	import { dateToTimestamp, daysSince } from '$lib/timeUtil';
	import ReturnStatusBadges from './ReturnStatusBadges.svelte';

	let open;

	export let returnEntry;

	let requiredFields = [];

	const checkResolveConditions = (returnEntry) => {
		requiredFields = [];

		if (returnEntry.images.length < 1) {
			requiredFields.push('dodaj co najmniej jedno zdjęcie');
		}
		if (returnEntry.products.length < 1) {
			requiredFields.push('dodaj co najmniej jeden produkt');
		}
		if (!returnEntry.returnReason) {
			requiredFields.push('uzupełnij powód zwrotu');
		}
		if (!returnEntry.saleSource) {
			requiredFields.push('uzupełnij źródło sprzedaży');
		}
		if (
			returnEntry.sender.name.length < 5 ||
			returnEntry.sender.city.length < 3 ||
			returnEntry.sender.postCode.length < 3 ||
			returnEntry.sender.street.length < 3
		) {
			requiredFields.push('uzupełnij dane nadawcy');
		}

		for (const product of returnEntry.products) {
			if (!product.location) {
				requiredFields.push(`dodaj lokalizację dla ${product.name}`);
			}
		}
	};

	$: checkResolveConditions(returnEntry);

	const dispatch = createEventDispatcher();

	const setResolvedStatus = async (resolved = true) => {
		const res = await post('returns/edit/resolvedStatus', { resolved, returnId: returnEntry.id });
		dispatch('change');
		return res ? true : false;
	};
</script>

<div class="flex flex-col">
	<DataTable table$aria-label="People list" style="width: 100%;">
		<Head>
			<Row>
				<Cell>Parametr</Cell>
				<Cell />
			</Row>
		</Head>
		<Body>
			<Row>
				<Cell>Zwrot utworzono</Cell>
				<Cell>{Math.round(daysSince(dateToTimestamp(returnEntry.created_at)))} dni temu</Cell>
			</Row>
			<Row>
				<Cell>Ostatnia edycja</Cell>
				<Cell>{Math.round(daysSince(dateToTimestamp(returnEntry?.events[0]?.created_at)))} dni temu</Cell>
			</Row>
			<Row>
				<Cell>Status</Cell>
				<Cell><ReturnStatusBadges entry={returnEntry} /></Cell>
			</Row>
		</Body>
	</DataTable>

	{#if !returnEntry.resolved}
		{#if requiredFields.length > 0}
			<span class="font-bold mt-2">Przed zakończeniem zwrotu:</span>
			<ul>
				{#each requiredFields as requirement}
					<li>{requirement}</li>
				{/each}
			</ul>
		{/if}
		{#if requiredFields.length == 0}
			<filler class="mt-2 w-full" />
			<Button on:click={() => setResolvedStatus()} variant="raised">
				<Label>Zakończ</Label>
			</Button>
		{/if}
	{/if}
	{#if returnEntry.resolved}
		<filler class="mt-2 w-full" />
		<Button on:click={() => setResolvedStatus(false)} variant="outlined" color="secondary">
			<Label>Otwórz ponownie</Label>
		</Button>
	{/if}
</div>
