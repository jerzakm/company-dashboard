import { formatDate } from '$lib/util/time';
import Handsontable from 'handsontable';

function senderCellRenderer(instance, td, row, col, prop, value) {
	td.innerHTML = `<div class="flex flex-col"><span class="font-bold">${value.name}</span><span>${value.street}</span><span>${value.postCode} ${value.city}</span></div>`;
}
Handsontable.renderers.registerRenderer('senderRenderer', senderCellRenderer);

function dateCellRenderer(instance, td, row, col, prop, value) {
	td.innerHTML = `${formatDate(value, 'DD-MM-YYYY')}`;
}
Handsontable.renderers.registerRenderer('dateRenderer', dateCellRenderer);

function productsCellRenderer(instance, td, row, col, prop, value) {
	let html = '';

	const products = JSON.parse(value);

	products.map((product) => (html += `${product.quantity}x ${product.name}\n`));

	td.innerHTML = html;
}
Handsontable.renderers.registerRenderer('productsRenderer', productsCellRenderer);
