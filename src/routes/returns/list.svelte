<script lang="ts">
	import { get } from '$lib/api';

	import DataTable, { Head, Body, Row, Cell, Pagination } from '@smui/data-table';
	import Select, { Option } from '@smui/select';
	import IconButton from '@smui/icon-button';
	import Button, { Label } from '@smui/button';
	import { onMount } from 'svelte';
	import { formatListDate, sortById } from './_listUtil';
	import AscendingIcon from '$lib/components/small/AscendingIcon.svelte';

	let filteredList = [];
	let returnsList = [];

	let filterOptions = {
		id: {
			ascending: false
		}
	};

	let rowsPerPage = 10;
	let currentPage = 0;

	$: start = currentPage * rowsPerPage;
	$: end = Math.min(start + rowsPerPage, filteredList.length);
	$: slice = filteredList.slice(start, end);
	$: lastPage = Math.max(Math.ceil(filteredList.length / rowsPerPage) - 1, 0);

	$: if (currentPage > lastPage) {
		currentPage = lastPage;
	}

	const applyFilters = () => {
		filteredList = sortById(returnsList, filterOptions.id.ascending);
		// filteredList = sortByDate(returnsList, filterOptions.date.ascending);

		// have to update the slice here for pagination to refresh
		slice = filteredList.slice(start, end);
	};

	$: filterOptions && applyFilters();

	const getList = async () => {
		const list = await get('returns/list');
		console.log(list[list.length - 1].products);
		return list;
	};

	onMount(async () => {
		returnsList = await getList();
		applyFilters();
	});

	let valueA = '';
</script>

<h1>Lista zwrotów</h1>

<DataTable table$aria-label="Lista zwrotów" class="w-full">
	<Head>
		<Row>
			<!-- return Id -->
			<Cell numeric>
				<Button on:click={() => (filterOptions.id.ascending = !filterOptions.id.ascending)}>
					<Label>Nr</Label>
					<AscendingIcon ascending={filterOptions.id.ascending} />
				</Button>
			</Cell>
			<!-- date -->
			<Cell>Data</Cell>
			<Cell>Nadawca</Cell>
			<Cell class="w-full">Produkty</Cell>
			<Cell>Lokalizacja</Cell>
			<Cell>Dokumenty</Cell>
			<Cell>Powód zwrotu</Cell>
			<Cell>Zdjęcia</Cell>
			<Cell>Status</Cell>
		</Row>
	</Head>
	{#key filteredList}
		<Body>
			{#each slice as item (item.id)}
				<Row>
					<Cell numeric>{item.id}</Cell>
					<Cell>{formatListDate(item.created_at)}</Cell>
					<Cell class="flex flex-col mb-2 overflow-visible">
						<span><b>{item.sender.name}</b></span>
						<span>{item.sender.street}</span>
						<span>{item.sender.postCode} {item.sender.city}</span>
					</Cell>
					<Cell>
						<ul>
							{#each item.products as product}
								<li><b>{product.quantity}x</b> [{product.symbol}] {product.name}</li>
							{/each}
						</ul>
					</Cell>
					<Cell>MAG_A32</Cell>
					<Cell />
					<Cell>Odstąpienie</Cell>
					<Cell>Brak</Cell>
					<Cell>Zakończono</Cell>
				</Row>
			{/each}
		</Body>
	{/key}

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

<style>
	:global(mdc-data-table__table-container) {
		overflow: hidden;
	}
</style>
