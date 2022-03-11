export const statusGoals = {
	senderLength: 20,
	imageQty: 2
};

export const checkEntryStatusRequirements = (entry: any) => {
	return {
		sender:
			`${entry.sender.name}${entry.sender.city}${entry.sender.street}${entry.sender.postCode}`
				.length > statusGoals.senderLength
				? true
				: false,
		images: entry.images.length >= statusGoals.imageQty,
		saleSource: entry.saleSourceId ? true : false,
		returnReason: entry.returnReasonId ? true : false
	};
};
