<script lang="ts">
	import ProductSearch from '$lib/components/ProductSearch.svelte';

	let product;
	$: console.log(product);
</script>

<h1>Dodaj nowy zwrot</h1>

<ProductSearch bind:product />
