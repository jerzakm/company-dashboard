<script>
	import { sortByCreatedAt } from '$lib/util/sort';

	import Handsontable from 'handsontable';
	import { onMount } from 'svelte';

	export let entry;

	let productsTableEl;

	let productsTable;

	$: productsTable && entry && updateData();

	const updateData = () => {
		console.log(entry);
		const products = sortByCreatedAt([...entry.products], true).map((p, i) => {
			p.index = i;
			return p;
		});
		productsTable.updateData(products);
	};

	onMount(() => {
		productsTable = new Handsontable(productsTableEl, {
			data: [],
			rowHeaders: false,
			colHeaders: ['#', 'Symbol', 'Name', 'Group', 'Notes', 'Actions'],
			columns: [
				{ data: 'index' },
				{ data: 'symbol' },
				{ data: 'name' },
				{ data: 'group' },
				{ data: 'description' },
				{ data: '' }
			],
			height: 'auto',
			dropdownMenu: true,
			hiddenColumns: {
				indicators: true
			},
			search: true,
			contextMenu: true,
			multiColumnSorting: true,
			filters: true,
			allowInsertColumn: false,
			allowInsertRow: false,
			licenseKey: 'non-commercial-and-evaluation',
			readOnly: true,
			columnSorting: {
				initialConfig: {
					column: 0,
					sortOrder: 'desc'
				}
			}
		});
	});
</script>

<div bind:this={productsTableEl} id="returnsList" />
