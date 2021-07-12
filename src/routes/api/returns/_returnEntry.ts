import { prisma } from '../_prisma';

export const newReturn = async (returnEntry: IReturnEntryBasic) => {
	const { city, country, name, postCode, phone, street, products } = returnEntry;

	console.log(returnEntry.products);

	try {
		await prisma.returnEntry.create({
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
				}
			}
		});
	} catch (e) {
		console.log(e);
	}
};

export const changeReturn = () => {};

export interface IReturnEntryBasic {
	city: string;
	country: string;
	name: string;
	postCode: string;
	phone: string;
	street: string;
	products: IReturnProduct[];
}

export interface IReturnProduct {
	name: string;
	symbol: string;
	price: number;
	quantity: number;
	group: string;
	description: string;
}
