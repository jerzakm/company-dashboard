import { get } from './api';
import { minutesSince } from './timeUtil';

let lastProductsFetch = 90;
let products = [];

export const getProducts = async () => {
	// first check if products are available in local storage
	if (localStorage.getItem('subiektProducts')) {
		const subiektProducts = JSON.parse(localStorage.getItem('subiektProducts'));
		lastProductsFetch = subiektProducts.lastProductsFetch;
		products = [...subiektProducts.products];
	}
	// if not or update was later than X minutes ago, get them from Api and put in local storage for later
	if (minutesSince(lastProductsFetch) > 60) {
		try {
			const apiProducts = await get('subiekt/products');
			products = apiProducts.data;
			lastProductsFetch = Date.now();
			localStorage.setItem('subiektProducts', JSON.stringify({ lastProductsFetch, products }));
		} catch (e) {
			console.error(e);
		}
	}
	return products;
};
