<script lang="ts">
	import { get } from '$lib/api';
	import { formatListDate } from '$lib/timeUtil';

	import DataTable, { Head, Body, Row, Cell, Pagination } from '@smui/data-table';
	import IconButton from '@smui/icon-button';
	import Button, { Label, Icon } from '@smui/button';
	import { onMount } from 'svelte';
	import { sortById } from './_listUtil';
	import AscendingIcon from '$lib/components/small/AscendingIcon.svelte';
	import ReturnStatusBadges from './_components/ReturnStatusBadges.svelte';
	import AddNewReturnButton from './_components/AddNewReturnButton.svelte';

	let filteredList: any[] = [];
	let returnsList: any[] = [];

	let filterOptions = {
		id: {
			ascending: false
		}
	};

	let rowsPerPage = 50;
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
		slice = filteredList.slice(start, end);
	};

	$: filterOptions && applyFilters();

	const getList = async () => {
		const list = await get('returns/list');
		console.log(list[list.length - 1]);
		console.log(list[list.length - 1]?.products);
		return list;
	};

	const refreshList = async () => {
		returnsList = await getList();
		applyFilters();
	};

	onMount(async () => {
		await refreshList();
	});
</script>

<h1 class="mb-12">Lista zwrotów</h1>

<AddNewReturnButton
	on:newReturnAdded={() => {
		refreshList();
	}}
/>

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
			{#each slice as entry (entry.id)}
				<Row>
					<Cell numeric>
						<a href={`/returns/${entry.id}`} class="return-link">{entry.id} </a>
					</Cell>
					<Cell>{formatListDate(entry.created_at)}</Cell>
					<Cell class="flex flex-col mb-2 overflow-visible">
						<span><b>{entry.sender.name}</b></span>
						<span>{entry.sender.street}</span>
						<span>{entry.sender.postCode} {entry.sender.city}</span>
					</Cell>
					<Cell>
						<ul>
							{#each entry.products as product}
								<li><b>{product.quantity}x</b> [{product.symbol}] {product.name}</li>
							{/each}
						</ul>
					</Cell>
					<Cell>A32(test)</Cell>
					<Cell />
					<Cell>Odstąpienie</Cell>
					<Cell>Brak</Cell>
					<Cell>
						<ReturnStatusBadges {entry} />
					</Cell>
				</Row>
			{/each}
		</Body>
	{/key}

	<Pagination slot="paginate">
		<!-- <svelte:fragment slot="rowsPerPage">
			<Label>Rows Per Page</Label>
			<Select variant="outlined" bind:value={rowsPerPage} noLabel>
				<Option value={10}>10</Option>
				<Option value={25}>25</Option>
				<Option value={100}>100</Option>
			</Select>
		</svelte:fragment> -->
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
	:global(.mdc-data-table__table-container) {
		overflow-y: hidden;
	}
	.return-link {
		color: var(--primary);
		font-weight: 700;
	}
</style>
