<script>
	import { _ } from 'svelte-i18n';

	import { get } from '$lib/core/api';

	import Handsontable from 'handsontable';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import ReturnListFilters from './_components/ReturnListFilters.svelte';
	import { processFilterQuery } from '$lib/returnLogic/returnListFilters';

	const getList = async () => {
		const list = await get('returns/list');
		return list;
	};

	let returnsListEl;

	let initialData = [];
	let returnsTable;

	function filterQuery(query) {
		const filteredData = processFilterQuery(initialData, query.detail);
		console.log(filteredData.length);
		renderList(filteredData);
	}

	function renderList(data) {
		const returnsList = [];
		data.map((entry) => {
			returnsList.push({
				id: entry.id,
				date: entry.created_at,
				sender: `${entry.sender.name}\n${entry.sender.street}\n${entry.sender.postCode} ${entry.sender.city}`,
				products: JSON.stringify(entry.products),
				saleSource: entry.saleSource
					? `${entry.saleSource.subCategory} ${entry.saleSource.name}`
					: '',
				returnReason: entry.returnReason
					? `${entry.returnReason.category} - ${entry.returnReason.reason}`
					: '',
				status: entry.resolved
			});
		});
		returnsTable.updateData(returnsList);
	}

	onMount(async () => {
		returnsTable = new Handsontable(returnsListEl, {
			data: [],
			rowHeaders: false,
			colHeaders: [
				'#',
				$_('returns.list.table.date'),
				$_('returns.list.table.sender'),
				$_('returns.list.table.products'),
				$_('returns.list.table.returnReason'),
				$_('returns.list.table.saleSource'),
				$_('returns.list.table.status')
			],
			columns: [
				{ data: 'id' },
				{ data: 'date', renderer: 'dateRenderer' },
				{ data: 'sender' },
				{ data: 'products', renderer: 'productsRenderer' },
				{ data: 'returnReason' },
				{ data: 'saleSource' },
				{ data: 'status' }
			],
			height: 'calc(100%)',
			dropdownMenu: false,
			hiddenColumns: {
				indicators: true
			},
			// @ts-ignore
			contextMenu: {
				callback(key, selection, clickEvent) {
					// Common callback for all options
				},
				items: {
					sp1: '---------',

					edit: {
						// Own custom option
						name() {
							// `name` can be a string or a function
							return 'Edit'; // Name can contain HTML
						},
						callback(key, selection, clickEvent) {
							// Callback for specific option
							const row = selection[0].start.row;
							setTimeout(() => {
								const entryId = returnsTable.getDataAtRow(row)[0];
								editEntry(entryId);
							}, 0);
						}
					}
				}
			},
			allowInsertColumn: false,
			allowInsertRow: false,
			licenseKey: 'non-commercial-and-evaluation',
			readOnly: true,
			colWidths: [50, 50, 240, 80, 80],
			stretchH: 'all'
		});

		let clicked = 0;
		let clickedId = 0;

		returnsTable.addHook('afterOnCellMouseDown', async (event, coords, TD) => {
			if (coords.row == -1) return;
			try {
				const id = returnsTable.getDataAtRow(coords.row)[0];

				if (clickedId == 0 || clickedId == id) {
					clicked++;
				}

				clickedId = id;

				if (clicked >= 2) {
					editEntry(id);
				}

				setTimeout(() => {
					clicked = 0;
					clickedId = 0;
				}, 1000);
			} catch (e) {
				console.log(e);
			}
		});

		// render list
		const { data } = await getList();
		initialData = data;
		renderList(data);

		function editEntry(id) {
			goto(`/returns/entry-${id}`);
		}
	});
</script>

<svelte:head>
	<title>{$_('returns.list.pageTitle')}</title>
</svelte:head>

<div class="flex h-full flex-col">
	<ReturnListFilters on:filterQuery={filterQuery} />

	<div bind:this={returnsListEl} id="returnsList" />
</div>
