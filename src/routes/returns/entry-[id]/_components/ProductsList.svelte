<script>
	import { get, post } from '$lib/core/api';

	import { sortByCreatedAt } from '$lib/util/sort';

	import Handsontable from 'handsontable';
	import { onMount } from 'svelte';

	export let entry;

	let productsTableEl;

	let productsTable;

	$: productsTable && entry && updateData();

	const updateData = () => {
		const products = sortByCreatedAt([...entry.products], true).map((p, i) => {
			p.index = i;
			return p;
		});
		productsTable.updateData(products);
	};

	onMount(async () => {
		const { data } = await get('returns/dictionary');

		const locationsByGroup = data.locationsByGroup;

		const items = {};

		items.location = {
			// Own custom option
			name() {
				return '<span class="w-full flex -ml-2 px-1 font-bold text-lg border-b-2">Locations</span>'; // Name can contain HTML
			},
			disableSelection: true,
			isCommand: false
		};

		for (const group of locationsByGroup) {
			items[group.name] = {
				name: group.name,
				submenu: {
					items: group.locations.map((loc) => {
						return {
							key: `${group.name}:${loc.name}`,
							name: loc.name,
							callback(key, selection, clickEvent) {
								setTimeout(async () => {
									const row = selection[0].start.row;
									const rowData = productsTable.getDataAtRow(row);
									const returnProductId = rowData[6];
									await post('returns/edit/location', { returnProductId, locationId: loc.id });
								}, 0);
							}
						};
					})
				}
			};
		}
		items.clearLocation = {
			name: 'Clear location',
			callback(key, selection, clickEvent) {
				setTimeout(() => {
					alert('clearing loc');
				}, 0);
			}
		};

		items.sp1 = '---------';

		items.remove = {
			// Own custom option
			name() {
				// `name` can be a string or a function
				return 'Remove'; // Name can contain HTML
			},
			callback(key, selection, clickEvent) {
				// Callback for specific option
				const row = selection[0].start.row;
				setTimeout(() => {
					console.log(row);
				}, 0);
			}
		};

		function productLocationRenderer(hotInstance, td, row, column, prop, value, cellProperties) {
			td.innerHTML = value ? `${value.locationInfo.subName} - ${value?.locationInfo.name}` : '';
		}

		// Register an alias
		Handsontable.renderers.registerRenderer('entry.productLocation', productLocationRenderer);

		productsTable = new Handsontable(productsTableEl, {
			data: [],
			rowHeaders: false,
			colHeaders: ['#', 'Symbol', 'Name', 'Group', 'Notes', 'Location', 'id'],
			columns: [
				{ data: 'index' },
				{ data: 'symbol' },
				{ data: 'name' },
				{ data: 'group' },
				{ data: 'description' },
				{ data: 'location', renderer: 'entry.productLocation' },
				{ data: 'id' }
			],
			height: 'auto',
			dropdownMenu: true,
			hiddenColumns: {
				indicators: true,
				columns: [6]
			},
			search: true,
			//@ts-ignore
			contextMenu: {
				callback(key, selection, clickEvent) {
					// Common callback for all options
					// console.log(key, selection, clickEvent);
				},
				items
			},
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
