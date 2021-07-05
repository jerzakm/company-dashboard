<script lang="ts">
	import { getProducts } from '$lib/products';

	import Button, { Label } from '@smui/button';
	import { onMount } from 'svelte';

	import VirtualList from 'svelte-tiny-virtual-list';

	let products = [];

	onMount(async () => {
		products = await getProducts();
	});
</script>

<h1>Dodaj nowy zwrot</h1>

<Button
	on:click={async () => {
		console.log(products);
	}}>Get</Button
>

{#key products}
	<VirtualList width="100%" height={600} itemCount={products.length} itemSize={50}>
		<div slot="item" let:index let:style {style}>
			[{products[index].symbol}] {products[index].name}
		</div>
	</VirtualList>
{/key}
