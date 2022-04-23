export const processFilterQuery = (list, query) => {
	console.log('process query');
	console.log(list[10]);
	console.log(query);

	//sender query
	const filteredList = list.filter((entry) => {
		return senderQuery(entry.sender, query.sender);
	});

	return filteredList;
};

const senderQuery = (sender, senderQuery) => {
	return JSON.stringify(sender).toLowerCase().includes(senderQuery.toLowerCase());
};
