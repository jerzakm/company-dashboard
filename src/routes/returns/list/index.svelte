<script>
	import Layout from '$lib/components/Layout.svelte';

	import { get } from '$lib/core/api';

	import Handsontable from 'handsontable';
	import 'handsontable/dist/handsontable.full.css';
	import './_cellRenderers';
	import { onMount } from 'svelte';

	const getList = async () => {
		const list = await get('returns/list');
		return list;
	};

	let returnsListEl;

	onMount(async () => {
		const returnsList = [];

		const { data } = await getList();

		data.map((entry) => {
			returnsList.push({
				id: entry.id,
				date: entry.created_at,
				sender: `${entry.sender.name}\n${entry.sender.street}\n${entry.sender.postCode} ${entry.sender.city}`
			});
		});
		console.log(returnsList);

		const returnsTable = new Handsontable(returnsListEl, {
			data: returnsList,
			rowHeaders: false,
			colHeaders: ['#', 'Date', 'Sender'],
			columns: [{ data: 'id' }, { data: 'date', renderer: 'dateRenderer' }, { data: 'sender' }],
			height: '500px',
			dropdownMenu: true,
			hiddenColumns: {
				indicators: true
			},
			search: true,
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
