import type { ReturnProduct, ReturnSender } from '@prisma/client';
import { prisma } from '../../_prisma';

export const newReturn = async (returnEntry: IReturnEntryBasic, userId: string) => {
	const { city, country, name, postCode, phone, street, products } = returnEntry;

	try {
		return await prisma.returnEntry.create({
			data: {
				sender: {
					create: {
						city,
						country,
						name,
						postCode,
						phone,
						street
					}
				},
				resolved: false,
				products: {
					create: products
				},
				notes: {
					create: {
						content: 'Zwrot utworzony',
						type: 'Return created note',
						userId
					}
				},
				events: {
					create: {
						description: 'Wpis utworzony',
						userId,
						type: 'Return created'
					}
				}
			}
		});
	} catch (e) {
		console.log(e);
		return null;
	}
};

export const updateSender = async (data: ReturnSender) => {
	try {
		return await prisma.returnSender.update({
			where: {
				id: data.id
			},
			data
		});
	} catch (e) {
		console.log(e);
		return null;
	}
};

export const addProduct = async (
	productId: string,
	userId: string,
	returnId: number,
	quantity = 1
) => {
	try {
		const { group, name, symbol, buyPrice } = await prisma.product.findUnique({
			where: { id: productId }
		});

		return await prisma.returnProduct.create({
			data: {
				description: '',
				group,
				name,
				price: buyPrice,
				quantity,
				symbol,
				returnId
			}
		});
	} catch (e) {
		console.log(e);
		return null;
	}
};

export const delProduct = async (data: ReturnProduct) => {
	try {
		return await prisma.returnProduct.delete({
			where: {
				id: data.id
			}
		});
	} catch (e) {
		console.log(e);
		return null;
	}
};

// export const addImage = async (imgSrc: string, userId, returnId) => {
// 	try {
// 		return await prisma.returnImage.create({
// 			data: {
// 				imgSrc,
// 				description: '',
// 				userId,
// 				returnId
// 			}
// 		});
// 	} catch (e) {
// 		console.log(e);
// 		return null;
// 	}
// };

export const addNote = async (content: string, userId, returnId) => {
	try {
		return await prisma.returnNote.create({
			data: {
				content,
				type: 'Return note',
				returnId,
				userId
			}
		});
	} catch (e) {
		console.log(e);
		return null;
	}
};

export const createReturnEvent = async (returnId, userId, type, description, diff = '') => {
	try {
		return await prisma.returnEvent.create({
			data: {
				returnEntry: {
					connect: {
						id: returnId
					}
				},
				user: {
					connect: {
						id: userId
					}
				},
				type,
				description,
				diff
			}
		});
	} catch (e) {
		console.log(e);
		return null;
	}
};

export const updateSaleSource = async (returnId: number, saleSourceId: string | undefined) => {
	try {
		if (saleSourceId) {
			return await prisma.returnEntry.update({
				where: {
					id: returnId
				},
				data: {
					saleSource: {
						connect: {
							id: saleSourceId
						}
					}
				}
			});
		} else {
			return await prisma.returnEntry.update({
				where: { id: returnId },
				data: {
					saleSource: {
						disconnect: true
					}
				}
			});
		}
	} catch (e) {
		console.log(e);
		return null;
	}
};

export const updateReturnReason = async (returnId: number, returnReasonId: string | undefined) => {
	try {
		if (returnReasonId) {
			return await prisma.returnEntry.update({
				where: {
					id: returnId
				},
				data: {
					returnReason: {
						connect: {
							id: returnReasonId
						}
					}
				}
			});
		} else {
			return await prisma.returnEntry.update({
				where: { id: returnId },
				data: {
					returnReason: {
						disconnect: true
					}
				}
			});
		}
	} catch (e) {
		console.log(e);
		return null;
	}
};

export const updateSaleDocument = async (returnId: any, saleDocument: string) => {
	try {
		if (!saleDocument) saleDocument = '';
		return await prisma.returnEntry.update({
			where: {
				id: parseInt(returnId)
			},
			data: {
				saleDocument
			}
		});
	} catch (e) {
		console.log(e);
		return null;
	}
};

export interface IReturnEntryBasic {
	city: string;
	country: string;
	name: string;
	postCode: string;
	phone: string;
	street: string;
	products: IReturnProduct[];
	notes: string;
}

export interface IReturnProduct {
	name: string;
	symbol: string;
	price: number;
	quantity: number;
	group: string;
	description: string;
}

export const updateEntryStatus = async (returnId: any, status: boolean) => {
	try {
		return await prisma.returnEntry.update({
			where: {
				id: parseInt(returnId)
			},
			data: {
				resolved: status
			}
		});
	} catch (e) {
		console.log(e);
		return null;
	}
};
