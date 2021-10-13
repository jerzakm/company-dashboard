<script lang="ts">
	import DataTable, { Head, Body, Row, Cell } from '@smui/data-table';
	import Dialog, { Title, Content, Actions } from '@smui/dialog';
	import Button, { Label } from '@smui/button';
	import NewProductSearch from '$lib/components/NewProductSearch.svelte';
	import { onMount } from 'svelte';
	import { get } from '$lib/api';

	export let returnEntry;

	let openAddProduct = false;
	let product;

	let productList = [];

	const addNewProduct = async () => {
		console.log('adding new product', product);
	};

	onMount(async () => {
		// const dbProducts = await getProducts();
		const dbProducts = await get('subiekt/products');
		if (dbProducts?.data) productList = dbProducts.data;
		console.log(productList);
	});
</script>

{#if returnEntry}
	<products>
		<DataTable table$aria-label="Lista produktów" style="width: 100%;">
			<Head>
				<Row>
					<Cell>#</Cell>
					<Cell numeric>Ilość</Cell>
					<Cell>Symbol</Cell>
					<Cell>Nazwa</Cell>
					<Cell>Uwagi</Cell>
					<Cell />
				</Row>
			</Head>
			<Body>
				{#each returnEntry.products as product, i}
					<Row>
						<Cell numeric>{i + 1}</Cell>
						<Cell numeric>{product.quantity}</Cell>
						<Cell>{product.symbol}</Cell>
						<Cell>{product.name}</Cell>
						<Cell>{product.description}</Cell>
						<Cell
							><Button touch color="secondary">
								<Label>Usuń</Label>
							</Button></Cell
						>
					</Row>
				{/each}
			</Body>
		</DataTable>
		<Button class=" mb-4" variant="raised" on:click={() => (openAddProduct = true)}>
			<Label>Dodaj nowy</Label>
		</Button>
	</products>
{/if}

<Dialog bind:open={openAddProduct} aria-labelledby="Dodawanie produktu" aria-describedby="simple-content" fullscreen class="add-new-dialog">
	<!-- Title cannot contain leading whitespace due to mdc-typography-baseline-top() -->

	<Content id="simple-content" class="add-new-dialog">
		<Title id="simple-title">Dodaj nowy produkt</Title>
		<div class="new-product-container">
			<NewProductSearch bind:product />
		</div>
	</Content>
	<Actions
		><Button touch on:click={() => {}} color="secondary">
			<Label>Anuluj</Label>
		</Button>
		<Button
			touch
			variant="raised"
			on:click={() => {
				addNewProduct();
			}}
		>
			<Label>Dodaj</Label>
		</Button>
	</Actions>
</Dialog>

<style lang="scss">
	products {
		@apply flex;
		@apply flex-col;
		@apply justify-between;
		@apply h-full;
	}
	.add-new-dialog {
		min-width: 80%;
		max-width: unset;
	}
</style>
