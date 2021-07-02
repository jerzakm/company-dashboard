<script lang="ts">
	import { get } from '$lib/api';

	import Button, { Label } from '@smui/button';

	const updateProducts = async () => {
		const products = await get('subiekt/products');
	};
</script>

<h1>Produkty</h1>

<Button on:click={() => updateProducts()}>Aktualizuj</Button>
