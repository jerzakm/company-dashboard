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

	export let product = {};

	let focused = false;

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

<MenuSurface static style="width: 100%; transition: all 1s ease-out;">
	<div style="margin: 1rem;">
		<Textfield
			bind:value={productSearchString}
			label="Wyszukaj"
			on:input={() => filterProducts()}
			style="width:100%;"
			on:focus={() => (focused = true)}
			on:blur={() => setTimeout(() => (focused = false), 200)}
		>
			<HelperText slot="helper">Wpisz nazwę lub symbol towaru</HelperText>
		</Textfield>
		{#if focused}
			{#key filteredProducts}
				<VirtualList width="100%" height={600} itemCount={filteredProducts.length} itemSize={50}>
					<div slot="item" let:index let:style {style}>
						<Button
							on:click={() => {
								product = filteredProducts[index];
								focused = true;
							}}>[{filteredProducts[index].symbol}] {filteredProducts[index].name}</Button
						>
					</div>
				</VirtualList>
			{/key}
		{/if}
	</div>
</MenuSurface>
