<script lang="ts">
	// Components
	import { onMount, createEventDispatcher } from 'svelte';
	import Handsontable from 'handsontable';
	import { get, post } from '$lib/core/api';
	import Input from '$lib/components/core/Input.svelte';
	import { _ } from 'svelte-i18n';
	import { notifications } from '$lib/stores/notifications';

	export let entry;
	let addProductTableEl;
	let searchQuery = '';

	const dispatch = createEventDispatcher();

	let data = [];
	let filteredData = [];
	let productsTable;

	const searchProduct = (query: string) => {
		function filterQuery(entry) {
			let result = true;

			// find entry with ALL of the space or comma separated words in a query and remove whitespace
			query
				.split(/[ ,]+/)
				.filter(Boolean)
				// query.split(' ').
				.map((phrase) => {
					const match = JSON.stringify(entry).toLowerCase().includes(phrase.toLowerCase());
					if (!match) result = false;
				});

			return result;
		}

		filteredData = data.filter(filterQuery);
		productsTable.updateData(filteredData);
	};

	$: productsTable && searchProduct(searchQuery);

	onMount(async () => {
		data = (await get('products')).data;

		productsTable = new Handsontable(addProductTableEl, {
			data,
			rowHeaders: false,
			colHeaders: ['Symbol', `${$_('returns.entry.products.name')}`, ''],
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
			disableVisualSelection: false
		});

		productsTable.addHook('afterOnCellMouseDown', async (event, coords, TD) => {
			try {
				const product = productsTable.getDataAtRow(coords.row);
				const response = await post('returns/edit/products', {
					productId: product[2],
					returnId: entry.id
				});
				dispatch('newProductAdded', {
					product: response.data
				});
				notifications.sendNotification($_('returns.entry.notifications.productAdded'), 'success');
			} catch (e) {
				notifications.sendNotification($_('returns.entry.notifications.productAddErr'), 'error');
			}
		});

		productsTable.addHook('afterOnCellMouseOver', async (event, coords, TD) => {
			productsTable.selectRows(coords.row);
		});
	});
</script>

<Input placeholder={$_('ui.search')} class="mb-4 mr-1" bind:value={searchQuery} />
<div bind:this={addProductTableEl} id="returnsList" />
