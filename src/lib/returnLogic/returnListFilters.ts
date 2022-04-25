import * as removeAccents from 'remove-accents';

export const processFilterQuery = (list, query) => {
	console.log(list[100]);
	console.log('query', query);

	//sender query
	const filteredList = list.filter((entry) => {
		return senderQuery(entry.sender, query.sender) && productQuery(entry.products, query.product);
	});

	return filteredList;
};

const senderQuery = (sender, senderQuery) => {
	// both sender and query strings have locale accents removed (like ą,ę,ź etc), are normalized (NFC), converted to lowercase and non alpha-numeric characters removed
	const senderString = removeAccents
		.remove(Object.values(sender).join(''))
		.toLowerCase()
		.normalize()
		.replace(/\W+/g, ' ');
	const query = removeAccents.remove(senderQuery).toLowerCase().normalize().replace(/\W+/g, ' ');

	return senderString.includes(query);
};

const productQuery = (products, productQuery) => {
	// both sender and query strings have locale accents removed (like ą,ę,ź etc), are normalized (NFC), converted to lowercase and non alpha-numeric characters removed
	const productString = removeAccents
		.remove(JSON.stringify(products))
		.toLowerCase()
		.normalize()
		.replace(/\W+/g, ' ');
	const query = removeAccents.remove(productQuery).toLowerCase().normalize().replace(/\W+/g, ' ');

	return productString.includes(query);
};
