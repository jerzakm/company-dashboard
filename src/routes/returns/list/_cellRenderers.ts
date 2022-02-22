import { formatDate } from '$lib/util/time';
import Handsontable from 'handsontable';

function senderCellRenderer(instance, td, row, col, prop, value, cellProperties) {
	td.innerHTML = `<div class="flex flex-col"><span class="font-bold">${value.name}</span><span>${value.street}</span><span>${value.postCode} ${value.city}</span></div>`;
}
Handsontable.renderers.registerRenderer('senderRenderer', senderCellRenderer);

function dateCellRenderer(instance, td, row, col, prop, value, cellProperties) {
	td.innerHTML = `${formatDate(value, 'DD-MM-YYYY')}`;
}
Handsontable.renderers.registerRenderer('dateRenderer', dateCellRenderer);
