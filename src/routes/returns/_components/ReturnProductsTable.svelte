<script lang="ts">
	import DataTable, { Head, Body, Row, Cell } from '@smui/data-table';
	import Dialog, { Title, Content, Actions } from '@smui/dialog';
	import Button, { Label } from '@smui/button';
	import NewProductSearch from '$lib/components/NewProductSearch.svelte';
	import { onMount, createEventDispatcher } from 'svelte';
	import { get, post, del } from '$lib/api';
	import SaveChangesButton from './SaveChangesButton.svelte';
	import type { ReturnProduct } from '.prisma/client';

	export let returnEntry: any;

	let openAddProduct = false;
	let product;

	let productList = [];

	const dispatch = createEventDispatcher();

	const addNewProduct = async () => {
		product.returnId = returnEntry.id;
		const addProduct = await post(`returns/edit/product`, product);

		if (addProduct) {
			setTimeout(() => {
				openAddProduct = false;
				dispatch('change');
			}, 1000);
		}

		return addProduct ? true : false;
	};

	const deleteProduct = async (product: ReturnProduct) => {
		const deleted = await del('returns/edit/product', product);
		if (deleted) {
			dispatch('change');
		}
	};

	onMount(async () => {
		// const dbProducts = await getProducts();
		const dbProducts = await get('subiekt/products');
		if (dbProducts?.data) productList = dbProducts.data;
	});
</script>

{#if returnEntry}
	<products>
		<DataTable table$aria-label="Lista produktów" style="width: 100%;">
			<Head>
				<Row>
					<Cell numeric>Ilość</Cell>
					<Cell>Symbol</Cell>
					<Cell>Nazwa</Cell>
					<Cell style="width: 100%">Uwagi</Cell>
					<Cell />
				</Row>
			</Head>
			<Body>
				{#each returnEntry.products as product, i}
					<Row>
						<Cell numeric>{product.quantity}</Cell>
						<Cell>{product.symbol}</Cell>
						<Cell>{product.name}</Cell>
						<Cell>{product.description}</Cell>
						<Cell>
							<Button
								on:click={() => {
									deleteProduct(product);
								}}
							>
								<Label>Usuń</Label>
							</Button>
						</Cell>
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
		<div class="new-product-container relative mb-10 pb-10 z-50">
			<SaveChangesButton action={addNewProduct} visible={true} label={'Dodaj nowy produkt'} />
			<NewProductSearch bind:product />
		</div>
	</Content>
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
