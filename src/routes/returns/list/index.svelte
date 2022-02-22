<script>
	import Layout from '$lib/components/Layout.svelte';

	import { get } from '$lib/core/api';

	import Handsontable from 'handsontable';
	import 'handsontable/dist/handsontable.full.css';
	import { onMount } from 'svelte';

	const getList = async () => {
		const list = await get('returns/list');
		return list;
	};

	let returnsListEl;

	onMount(async () => {
		const { data } = await getList();

		console.log(data[10]);

		const returnsTable = new Handsontable(returnsListEl, {
			data,
			rowHeaders: false,
			colHeaders: true,
			columns: function (column) {
				let columnMeta = {};

				if (column === 0) {
					columnMeta.data = 'id';
				} else if (column === 1) {
					columnMeta.data = 'created_at';
				} else if (column === 2) {
					columnMeta.data = 'sender';
				} else if (column === 3) {
					columnMeta.data = 'sender.postCode';
				} else {
					columnMeta = null;
				}

				return columnMeta;
			},
			height: '500px',
			dropdownMenu: true,
			hiddenColumns: {
				indicators: true
			},

			contextMenu: true,
			multiColumnSorting: true,
			filters: true,
			licenseKey: 'non-commercial-and-evaluation'
		});
	});
</script>

<Layout>
	<div slot="content" class="w-full">
		<h1>Returns list</h1>

		<div bind:this={returnsListEl} />
	</div>
</Layout>
