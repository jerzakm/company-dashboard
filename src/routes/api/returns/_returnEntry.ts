import type { ReturnSender } from '@prisma/client';
import { prisma } from '../_prisma';

export const newReturn = async (returnEntry: IReturnEntryBasic, userId: string) => {
	const { city, country, name, postCode, phone, street, products, notes } = returnEntry;

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
						content: notes,
						type: 'Return created - notes',
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
