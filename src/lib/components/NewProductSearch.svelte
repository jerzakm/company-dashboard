<script lang="ts">
	import { getProducts } from '$lib/products';
	import Textfield from '@smui/textfield';
	import HelperText from '@smui/textfield/helper-text/index';

	import Button, { Label } from '@smui/button';
	import { onMount, createEventDispatcher } from 'svelte';

	import VirtualList from 'svelte-tiny-virtual-list';
	import { get } from '$lib/api';

	let productSearchString = '';

	let products = [];
	let filteredProducts = [];

	export let product = {
		name: '',
		symbol: '',
		price: 0.0,
		quantity: 1,
		group: '',
		description: ''
	};

	let focused = false;

	onMount(async () => {
		// const dbProducts = await getProducts();
		const dbProducts = await get('subiekt/products');
		if (dbProducts?.data) products = dbProducts.data;
		console.log(products);
		filterProducts();
	});

	function assignProduct(selectedProduct) {
		const { name, symbol, price, group } = selectedProduct;
		product.name = name;
		product.symbol = symbol;
		product.price = price ? price : 0;
		product.group = group;
	}

	function filterProducts() {
		filteredProducts = products?.filter((p) => {
			return (
				p.symbol.toLowerCase().includes(productSearchString.toLowerCase()) ||
				p.name.toLowerCase().includes(productSearchString.toLowerCase())
			);
		});
	}
</script>

<div class="add-product-container">
	<div class="product-qty">
		<Textfield bind:value={product.quantity} label="Ilość" type="number" />
	</div>
	<div>
		<Textfield
			bind:value={productSearchString}
			label="Wyszukaj"
			on:input={() => filterProducts()}
			style="width:100%;"
			on:focus={() => {
				focused = true;
				productSearchString = '';
				filterProducts();
			}}
		>
			<!-- on:blur={() => setTimeout(() => (focused = false), 200)} -->
			<HelperText slot="helper">Wybierz produkt</HelperText>
		</Textfield>
		{#if focused}
			{#key filteredProducts}
				<VirtualList width="100%" height={250} itemCount={filteredProducts.length} itemSize={33}>
					<div slot="item" let:index let:style {style}>
						<Button
							style="font-size: 0.75rem;"
							on:click={() => {
								focused = true;
								productSearchString = `[${filteredProducts[index].symbol}] ${filteredProducts[index].name}`;
								assignProduct(filteredProducts[index]);
								focused = false;
							}}>[{filteredProducts[index].symbol}] {filteredProducts[index].name}</Button
						>
					</div>
				</VirtualList>
			{/key}
		{/if}
	</div>
</div>
<div class="desc-container">
	<span><b>Wybrano</b> [{product.symbol}] {product.name}</span>
	<Textfield bind:value={product.description} label="Opis / Uwagi" style="width:100%" textarea />
</div>

<style>
	.add-product-container {
		margin: 1rem;
		display: grid;
		gap: 1rem;
		grid-template-columns: 2fr 20fr;
	}
	.desc-container {
		margin: 1rem;
	}
</style>
