<script lang="ts">
	import { get } from '$lib/api';

	import DataTable, { Head, Body, Row, Cell, Pagination } from '@smui/data-table';
	import Select, { Option } from '@smui/select';
	import IconButton from '@smui/icon-button';
	import Button, { Label, Icon } from '@smui/button';
	import { onMount } from 'svelte';
	import { formatListDate, sortById } from './_listUtil';
	import AscendingIcon from '$lib/components/small/AscendingIcon.svelte';

	interface IListFilter {
		id: {
			ascending: boolean;
			includes?: number;
		};
	}

	let filteredList = [];
	let returnsList = [];

	let filterOptions: IListFilter = {
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

		// have to update the slice here for pagination to refresh
		slice = filteredList.slice(start, end);
	};

	$: filterOptions && applyFilters();

	const getList = async () => {
		const list = await get('returns/list');
		return list;
	};

	onMount(async () => {
		returnsList = await getList();
		applyFilters();
	});
</script>

<h1>Lista zwrotów</h1>

<DataTable table$aria-label="Todo list" style="width: 100%;">
	<Head>
		<Row>
			<Cell numeric
				><Button on:click={() => (filterOptions.id.ascending = !filterOptions.id.ascending)}>
					<Label>Nr</Label>
					<AscendingIcon ascending={filterOptions.id.ascending} />
				</Button></Cell
			>
			<Cell>Data</Cell>
			<Cell style="width: 100%;">Nadawca</Cell>
		</Row>
	</Head>
	{#key filteredList}
		<Body>
			{#each slice as item (item.id)}
				<Row>
					<Cell numeric>{item.id}</Cell>
					<Cell>{formatListDate(item.created_at)}</Cell>
					<Cell>{item.sender.name}</Cell>
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
