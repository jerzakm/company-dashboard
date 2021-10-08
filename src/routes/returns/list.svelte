<script lang="ts">
	import { get } from '$lib/api';

	import DataTable, { Head, Body, Row, Cell, Pagination } from '@smui/data-table';
	import Select, { Option } from '@smui/select';
	import IconButton from '@smui/icon-button';
	import { Label } from '@smui/common';
	import { onMount } from 'svelte';

	let filteredList = [];

	let rowsPerPage = 10;
	let currentPage = 0;

	$: start = currentPage * rowsPerPage;
	$: end = Math.min(start + rowsPerPage, filteredList.length);
	$: slice = filteredList.slice(start, end);
	$: lastPage = Math.max(Math.ceil(filteredList.length / rowsPerPage) - 1, 0);

	$: if (currentPage > lastPage) {
		currentPage = lastPage;
	}

	const getList = async () => {
		const list = await get('returns/list');
		return list;
	};

	onMount(async () => {
		const returnsList = await getList();
		filteredList = returnsList;
		console.log(returnsList[returnsList.length - 1]);
	});
</script>

<h1>Lista zwrotów</h1>

<DataTable table$aria-label="Todo list" style="width: 100%;">
	<Head>
		<Row>
			<Cell numeric>#</Cell>
			<Cell>Data</Cell>
			<Cell style="width: 100%;">Nadawca</Cell>
		</Row>
	</Head>
	<Body>
		{#each slice as item (item.id)}
			<Row>
				<Cell numeric>{item.id}</Cell>
				<Cell>{item.created_at}</Cell>
				<Cell>{item.sender.name}</Cell>
			</Row>
		{/each}
	</Body>

	<Pagination slot="paginate">
		<svelte:fragment slot="rowsPerPage">
			<Label>Rows Per Page</Label>
			<Select variant="outlined" bind:value={rowsPerPage} noLabel>
				<Option value={10}>10</Option>
				<Option value={25}>25</Option>
				<Option value={100}>100</Option>
			</Select>
		</svelte:fragment>
		<svelte:fragment slot="total">
			{start + 1}-{end} of {filteredList.length}
		</svelte:fragment>

		<IconButton
			class="material-icons"
			action="first-page"
			title="First page"
			on:click={() => (currentPage = 0)}
			disabled={currentPage === 0}>first_page</IconButton
		>
		<IconButton class="material-icons" action="prev-page" title="Prev page" on:click={() => currentPage--} disabled={currentPage === 0}
			>chevron_left</IconButton
		>
		<IconButton
			class="material-icons"
			action="next-page"
			title="Next page"
			on:click={() => currentPage++}
			disabled={currentPage === lastPage}>chevron_right</IconButton
		>
		<IconButton
			class="material-icons"
			action="last-page"
			title="Last page"
			on:click={() => (currentPage = lastPage)}
			disabled={currentPage === lastPage}>last_page</IconButton
		>
	</Pagination>
</DataTable>
