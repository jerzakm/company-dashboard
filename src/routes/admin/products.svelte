<script lang="ts">
	import { get } from '$lib/api';
	import { firestore } from '$lib/firebase';

	import Button, { Label } from '@smui/button';

	const updateProducts = async () => {
		const products = await get('subiekt/products');
		if (products && products.data.length > 0) {
			const product = products.data[5];

			var cityRef = firestore.collection('products').doc(`${product.subiektId}`);

			var setWithMerge = cityRef.set(product, { merge: true });
			console.log(setWithMerge);
		}
	};
</script>

<h1>Produkty</h1>

<Button on:click={() => updateProducts()}>Aktualizuj</Button>
