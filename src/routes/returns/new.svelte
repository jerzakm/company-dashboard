<script lang="ts">
	import NewProductSearch from '$lib/components/NewProductSearch.svelte';
	import Textfield from '@smui/textfield';
	import Icon from '@smui/textfield/icon';
	import Card from '@smui/card';
	import Button, { Label } from '@smui/button';

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
			<h2>Produkty</h2>

			{#each newReturn.products as product}{product.name}{/each}

			<div class="divider" />
			<div class="new-product-container">
				<h3>Dodaj nowy</h3>
				<NewProductSearch bind:product />
				<Button
					touch
					variant="raised"
					style="width:100%;"
					on:click={() => {
						newReturn.products.push(product);
						newReturn.products = newReturn.products;
					}}
				>
					<Label>Dodaj</Label>
				</Button>
			</div>
		</container>
	</Card>
</newReturn>

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
		background-color: rgba(202, 202, 202, 0.39);
	}
</style>
