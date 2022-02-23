<script>
	import Layout from '$lib/components/Layout.svelte';
	import ReturnsSidebar from '../_sidebar.svelte';
	import { _ } from 'svelte-i18n';

	import { get } from '$lib/core/api';

	import Handsontable from 'handsontable';
	import 'handsontable/dist/handsontable.full.css';
	import './_table.css';
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
		console.log(data);

		data.map((entry) => {
			returnsList.push({
				id: entry.id,
				date: entry.created_at,
				sender: `${entry.sender.name}\n${entry.sender.street}\n${entry.sender.postCode} ${entry.sender.city}`,
				products: JSON.stringify(entry.products),
				returnReason: entry.returnReason
					? `${entry.returnReason.category} - ${entry.returnReason.reason}`
					: '',
				status: entry.resolved
			});
		});
		console.log(returnsList);

		const returnsTable = new Handsontable(returnsListEl, {
			data: returnsList,
			rowHeaders: false,
			colHeaders: [
				'#',
				$_('returns.list.table.date'),
				$_('returns.list.table.sender'),
				$_('returns.list.table.products'),
				$_('returns.list.table.returnReason'),
				$_('returns.list.table.status')
			],
			columns: [
				{ data: 'id' },
				{ data: 'date', renderer: 'dateRenderer' },
				{ data: 'sender' },
				{ data: 'products', renderer: 'productsRenderer' },
				{ data: 'returnReason' },
				{ data: 'status' }
			],
			height: '100%',
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

<svelte:head>
	<title>{$_('returns.list.pageTitle')}</title>
</svelte:head>

<Layout>
	<div slot="sidebar">
		<ReturnsSidebar active="/returns/list" />
	</div>
	<div slot="content" class="w-full ">
		<div bind:this={returnsListEl} id="returnsList" />
	</div>
</Layout>

<style>
</style>
