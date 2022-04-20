<script>
	import { del, get, post } from '$lib/core/api';
	import { _ } from 'svelte-i18n';
	import { sortByCreatedAt } from '$lib/util/sort';

	import Handsontable from 'handsontable';
	import { createEventDispatcher, onMount } from 'svelte';
	import { notifications } from '$lib/stores/notifications';

	export let entry;

	let productsTableEl;

	let productsTable;

	$: productsTable && entry && updateData();

	const dispatch = createEventDispatcher();

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
				return `<span class="w-full flex -ml-2 px-1 font-bold text-lg border-b-2"> ${$_(
					'returns.entry.products.location'
				)} </span>`; // Name can contain HTML
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
									try {
										await post('returns/edit/location', {
											returnProductId,
											locationId: loc.id,
											returnId: entry.id
										});
										notifications.sendNotification(
											$_('returns.entry.notifications.locationChangedSuccess'),
											'success'
										);
										dispatch('locationChanged');
									} catch (e) {
										console.log(e);
										notifications.sendNotification(
											$_('returns.entry.notifications.locationChangedErr'),
											'error'
										);
									}
								}, 0);
							}
						};
					})
				}
			};
		}
		items.clearLocation = {
			name: `${$_('returns.entry.products.clearLocation')}`,
			callback(key, selection, clickEvent) {
				setTimeout(async () => {
					const row = selection[0].start.row;
					const rowData = productsTable.getDataAtRow(row);
					const returnProductId = rowData[6];
					setTimeout(async () => {
						try {
							await del('returns/edit/location', { returnProductId, returnId: entry.id });
							dispatch('locationChanged');
							notifications.sendNotification(
								$_('returns.entry.notifications.locationRemovedSuccess'),
								'success'
							);
						} catch (e) {
							notifications.sendNotification(
								$_('returns.entry.notifications.locationRemovedErr'),
								'error'
							);
						}
					}, 0);
				}, 0);
			}
		};

		items.sp1 = '---------';

		items.remove = {
			// Own custom option
			name() {
				// `name` can be a string or a function
				return `<span class="text-[color:var(--error-color)]">${$_(
					'returns.entry.products.removeProduct'
				)}</span>`;
			},
			callback(key, selection, clickEvent) {
				setTimeout(async () => {
					const row = selection[0].start.row;
					const rowData = productsTable.getDataAtRow(row);
					const returnProductId = rowData[6];
					setTimeout(async () => {
						try {
							await del('returns/edit/products', { returnProductId, returnId: entry.id });
							dispatch('locationChanged');
							notifications.sendNotification(
								$_('returns.entry.notifications.productRemovedSuccess'),
								'success'
							);
						} catch (e) {
							notifications.sendNotification(
								$_('returns.entry.notifications.productRemovedErr'),
								'error'
							);
						}
					}, 0);
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
			colHeaders: [
				'#',
				`${$_('returns.entry.products.symbol')}`,
				`${$_('returns.entry.products.name')}`,
				`${$_('returns.entry.products.group')}`,
				`${$_('returns.entry.products.notes')}`,
				`${$_('returns.entry.products.location')}`,
				'id'
			],
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
