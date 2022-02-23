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

export const addProduct = async (data: ReturnProduct, userId: string, returnId: number) => {
	try {
		return await prisma.returnProduct.create({
			data: {
				...data
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

export const addImage = async (imgSrc: string, userId, returnId) => {
	try {
		return await prisma.returnImage.create({
			data: {
				imgSrc,
				description: '',
				userId,
				returnId
			}
		});
	} catch (e) {
		console.log(e);
		return null;
	}
};

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

export const updateSaleSource = async (data) => {
	console.log(data);
	try {
		return await prisma.returnEntry.update({
			where: {
				id: data.returnId
			},
			data: {
				saleSource: {
					connect: {
						id: data.saleSource.id
					}
				}
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
