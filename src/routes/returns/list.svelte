<script lang="ts">
	import { get } from '$lib/api';

	import DataTable, { Head, Body, Row, Cell } from '@smui/data-table';
	import { onMount } from 'svelte';

	let filteredList = [];

	const getList = async () => {
		const list = await get('returns/list');
		return list;
	};

	onMount(async () => {
		const l = await getList();
		filteredList = l;
		console.log(l[0]);
	});
</script>

<h1>Lista zwrotów</h1>

<DataTable stickyHeader table$aria-label="User list" style="width: 100%;">
	<Head>
		<Row>
			<Cell numeric>#</Cell>
			<Cell>Data</Cell>
			<Cell style="width: 100%;">Nadawca</Cell>
			<Cell>Produkty</Cell>
		</Row>
	</Head>
	<Body>
		{#each filteredList as entry (entry.id)}
			<Row>
				<Cell numeric>{entry.id}</Cell>
				<Cell>{entry.created_at}</Cell>
				<Cell>{entry.sender.name}</Cell>
				<Cell>{entry.products}</Cell>
			</Row>
		{/each}
	</Body>
</DataTable>
