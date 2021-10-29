<script>
	import Dialog, { Title, Content } from '@smui/dialog';
	import Button, { Label } from '@smui/button';
	import List, { Item, Text } from '@smui/list';
	import { createEventDispatcher, onMount } from 'svelte';
	import { get, post } from '$lib/api';
	import DataTable, { Head, Body, Row, Cell } from '@smui/data-table';
	import dayjs from 'dayjs';
	import { dateToTimestamp, daysSince } from '$lib/timeUtil';
	import ReturnStatusBadges from './ReturnStatusBadges.svelte';

	let open;

	export let returnEntry;

	const dispatch = createEventDispatcher();

	onMount(() => {});
</script>

<Dialog bind:open selection aria-labelledby="list-title" aria-describedby="list-content">
	<Title id="list-title">Przenieś produkt do:</Title>
	<Content id="list-content">
		<List>
			<!-- {#if locations}
				{#each locations as location}
					<Item
						on:click={() => {
							// clicked = item;
							setProductLocation(location);
							open = false;
						}}
					>
						<Text>{location.name} - {location.subName}</Text>
					</Item>
				{/each}
			{/if} -->
		</List>
	</Content>
</Dialog>

<div class="flex items-center">
	<!-- <Button on:click={() => (open = true)}>
		<Label>{product.location ? `${product.location.locationInfo.name} ${product.location.locationInfo.subName}` : 'BRAK!'}</Label>
	</Button> -->

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
</div>
