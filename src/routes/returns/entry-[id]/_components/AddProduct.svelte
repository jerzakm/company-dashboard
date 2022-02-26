<script lang="ts">
	// Components
	import { onDestroy, onMount } from 'svelte';
	import Handsontable from 'handsontable';
	import { get, post } from '$lib/core/api';
	import Input from '$lib/components/core/Input.svelte';

	let addProductTableEl;

	export let entry;

	onMount(async () => {
		const { data } = await get('products');

		const productsTable = new Handsontable(addProductTableEl, {
			data,
			rowHeaders: false,
			colHeaders: ['Symbol', 'Name', ''],
			columns: [{ data: 'symbol' }, { data: 'name' }, { data: 'id' }],
			height: '65vh',
			dropdownMenu: true,
			hiddenColumns: {
				indicators: true,
				columns: [2]
			},
			search: true,
			contextMenu: true,
			multiColumnSorting: true,
			filters: true,
			allowInsertColumn: false,
			allowInsertRow: false,
			licenseKey: 'non-commercial-and-evaluation',
			readOnly: true,
			disableVisualSelection: true
		});

		productsTable.addHook('afterOnCellMouseDown', async (event, coords, TD) => {
			const product = productsTable.getDataAtRow(coords.row);
			console.log(product);
			await post('returns/edit/products', { productId: product[2], returnId: entry.id });
		});
	});
</script>

<Input placeholder="Search" class="mb-4 mr-1" />
<div bind:this={addProductTableEl} id="returnsList" />
