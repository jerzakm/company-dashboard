<script lang="ts">
	import NewProductSearch from '$lib/components/NewProductSearch.svelte';
	import Textfield from '@smui/textfield';
	import Icon from '@smui/textfield/icon';
	import Card from '@smui/card';
	import Button, { Label } from '@smui/button';
	import DataTable, { Head, Body, Row, Cell } from '@smui/data-table';

	import Dialog, { Title, Content, Actions } from '@smui/dialog';

	let openAddProduct;
	let clicked = 'Nothing yet.';

	let newReturn = {
		name: '',
		street: '',
		postCode: '',
		city: '',
		country: 'PL',
		products: []
	};

	let products = [];

	$: console.log(products.length);

	let product;
</script>

<h1>Nowy zwrot</h1>

<newReturn>
	<Card padded>
		<container>
			<h2>Nadawca</h2>
			<!-- name -->
			<div>
				<Textfield variant="outlined" bind:value={newReturn.name} label="Imię i nazwisko / Firma" style="width:100%;" class="test">
					<Icon class="material-icons" slot="leadingIcon">person_outline</Icon>
				</Textfield>
			</div>
			<!-- street -->
			<div>
				<Textfield variant="outlined" bind:value={newReturn.street} label="Ulica" style="width:100%;">
					<Icon class="material-icons" slot="leadingIcon">edit_road</Icon>
				</Textfield>
			</div>
			<!-- postCode -->
			<cityPost>
				<Textfield variant="outlined" bind:value={newReturn.postCode} label="Kod pocztowy" style="width:20%;">
					<Icon class="material-icons" slot="leadingIcon">my_location</Icon>
				</Textfield>
				<!-- city -->
				<Textfield variant="outlined" bind:value={newReturn.city} label="Miejscowość" style="flex: 1; margin-left: 0.6rem;">
					<Icon class="material-icons" slot="leadingIcon">location_city</Icon>
				</Textfield>
			</cityPost>
		</container>
		<!-- <ProductSearch bind:product /> -->
	</Card>
	<Card padded>
		<container>
			<h2>
				Produkty <Button on:click={() => (openAddProduct = true)}>
					<Label>Dodaj</Label>
				</Button>
			</h2>

			<DataTable table$aria-label="People list" style="max-width: 100%;">
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
					{#each newReturn.products as product, i}
						<Row>
							<Cell numeric>{i + 1}</Cell>
							<Cell numeric>{product.quantity}</Cell>
							<Cell>{product.symbol}</Cell>
							<Cell>{product.name}</Cell>
							<Cell>{product.description}</Cell>
							<Cell
								><Button
									touch
									on:click={() => {
										newReturn.products = newReturn.products.filter((item, index) => index != i);
									}}
									color="secondary"
								>
									<Label>Usuń</Label>
								</Button></Cell
							>
						</Row>
					{/each}
				</Body>
			</DataTable>

			<div class="divider" />
		</container>
	</Card>
</newReturn>

<Dialog bind:open={openAddProduct} aria-labelledby="simple-title" aria-describedby="simple-content">
	<!-- Title cannot contain leading whitespace due to mdc-typography-baseline-top() -->
	<Title id="simple-title">Dodaj nowy produkt</Title>
	<Content id="simple-content"
		><div class="new-product-container">
			<NewProductSearch bind:product />
		</div></Content
	>
	<Actions
		><Button touch on:click={() => {}} color="secondary">
			<Label>Anuluj</Label>
		</Button>
		<Button
			touch
			variant="raised"
			on:click={() => {
				newReturn.products.push(JSON.parse(JSON.stringify(product)));
				newReturn.products = newReturn.products;
				console.log(newReturn.products);
			}}
		>
			<Label>Dodaj</Label>
		</Button>
	</Actions>
</Dialog>

<style>
	newReturn {
		display: grid;
		grid-template-columns: repeat(1fr, 1);
		row-gap: 2rem;
	}
	container > * {
		margin: 0.6rem 0;
	}
	h2 {
		margin-bottom: 2rem;
	}
	cityPost {
		width: 100%;
		display: flex;
	}
	.new-product-container {
		padding: 0.5rem;
		/* background-color: rgba(202, 202, 202, 0.39); */
	}
</style>
