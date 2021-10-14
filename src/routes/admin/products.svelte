<script lang="ts">
	import { get, post } from '$lib/api';

	import Button, { Label } from '@smui/button';

	const updateProducts = async () => {
		const products = await get('subiekt/products');
		const productsU = await post('subiekt/products', {});
	};
</script>

<h1>Produkty</h1>

<Button on:click={() => updateProducts()}>Aktualizuj</Button>
