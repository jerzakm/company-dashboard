<script>
	import { _ } from 'svelte-i18n';

	import { get } from '$lib/core/api';

	import Handsontable from 'handsontable';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

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
			filters: true,
			// @ts-ignore
			contextMenu: {
				callback(key, selection, clickEvent) {
					// Common callback for all options
					// console.log(key, selection, clickEvent);
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
			multiColumnSorting: {
				initialConfig: {
					column: 0,
					sortOrder: 'desc'
				}
			}
		});

		let clicked = 0;
		let clickedId = 0;

		returnsTable.addHook('afterOnCellMouseDown', async (event, coords, TD) => {
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

		function editEntry(id) {
			goto(`/returns/entry-${id}`);
		}
	});
</script>

<svelte:head>
	<title>{$_('returns.list.pageTitle')}</title>
</svelte:head>

<div bind:this={returnsListEl} id="returnsList" />

<style>
</style>
