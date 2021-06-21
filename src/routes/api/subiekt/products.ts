import { PrismaClient } from '@prisma/client';
import { getProductList } from './_dbQueries';

const prisma = new PrismaClient();

// Any authenticated user - get the product list from prismaDb
export async function get(request) {
	const products = prisma.product.findMany();

	return {
		body: {
			data: products
		}
	};
}

export async function post() {
	const updatedProductCount = await updateProductList();
	return { body: { updatedCount: updatedProductCount } };
}

async function updateProductList() {
	const products = await getProductList();

	let productCount = 0;

	if (products) {
		const promises = [];
		for (const product of products) {
			promises.push(
				prisma.product.upsert({
					where: {
						subiektId: product.tw_Id
					},
					update: {
						subiektId: product.tw_Id,
						buyPrice: product.tc_CenaNetto5 ? product.tc_CenaNetto5 : 0,
						isSet: product.tw_Rodzaj ? false : true,
						name: product.tw_Nazwa ? product.tw_Nazwa : '',
						symbol: product.tw_Symbol ? product.tw_Symbol : '',
						volume: product.tw_Objetosc ? product.tw_Objetosc : 0,
						weight: product.tw_Masa ? product.tw_Masa : 0,
						group: product.grt_Nazwa ? product.grt_Nazwa : ''
					},
					create: {
						subiektId: product.tw_Id,
						buyPrice: product.tc_CenaNetto5 ? product.tc_CenaNetto5 : 0,
						isSet: product.tw_Rodzaj ? false : true,
						name: product.tw_Nazwa ? product.tw_Nazwa : '',
						symbol: product.tw_Symbol ? product.tw_Symbol : '',
						volume: product.tw_Objetosc ? product.tw_Objetosc : 0,
						weight: product.tw_Masa ? product.tw_Masa : 0,
						group: product.grt_Nazwa ? product.grt_Nazwa : ''
					}
				})
			);
		}

		const transaction = await prisma.$transaction(promises).then((r) => {
			productCount = r.length;
		});
	}

	return productCount;
}
