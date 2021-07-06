<script lang="ts">
	import { getProducts } from '$lib/products';
	import MenuSurface from '@smui/menu-surface';
	import Textfield from '@smui/textfield';
	import HelperText from '@smui/textfield/helper-text/index';

	let productSearchString = '';

	import Button, { Label } from '@smui/button';
	import { onMount } from 'svelte';

	import VirtualList from 'svelte-tiny-virtual-list';

	let products = [];
	let filteredProducts = [];

	onMount(async () => {
		const dbProducts = await getProducts();
		console.log(dbProducts);
		if (dbProducts) products = dbProducts;
		filterProducts();
	});

	function filterProducts() {
		console.log('filtering');
		filteredProducts = products.filter((p) => {
			return (
				p.symbol.toLowerCase().includes(productSearchString.toLowerCase()) ||
				p.name.toLowerCase().includes(productSearchString.toLowerCase())
			);
		});
	}
</script>

{filteredProducts.length}/{products.length}

<MenuSurface static style="width: 100%;">
	<div style="margin: 1rem;">
		<Textfield bind:value={productSearchString} label="Wyszukaj" on:input={() => filterProducts()} style="width:100%;">
			<HelperText slot="helper">Wpisz nazwę lub symbol towaru</HelperText>
		</Textfield>
		{#key filteredProducts}
			<VirtualList width="100%" height={600} itemCount={filteredProducts.length} itemSize={50}>
				<div slot="item" let:index let:style {style}>
					<Button>[{filteredProducts[index].symbol}] {filteredProducts[index].name}</Button>
				</div>
			</VirtualList>
		{/key}
	</div>
</MenuSurface>
