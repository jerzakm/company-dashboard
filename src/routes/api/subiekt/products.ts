import { minutesSince } from '$lib/timeUtil';
import { AppLogStatus, createAppLogEntry } from '../_applicationLog';
import { ApiPermission, tokenHasPermission } from '../_authUtil';
import { prisma } from '../_prisma';
import { getProductList } from './_dbQueries';

let products;
let lastUpdate = 0;

export async function get(request) {
	const permission = await tokenHasPermission(request.headers.authorization, ApiPermission.PRODUCTS_GET);

	let status = 0;
	let body = {};

	createAppLogEntry(AppLogStatus.INFO, 'User requested products get', permission.userId);

	if (permission.granted) {
		try {
			if (minutesSince(lastUpdate) > 60) {
				products = await prisma.product.findMany({});
			}
			body = {
				data: products
			};
			status = 200;
		} catch (error) {
			body = { error };
			status = 500;
		}
	} else {
		status = 401;
	}

	return {
		status,
		body
	};
}

export async function post(request) {
	const permission = await tokenHasPermission(request.headers.authorization, ApiPermission.PRODUCTS_POST);

	let status = 0;
	let body = {};

	createAppLogEntry(AppLogStatus.INFO, 'User requested products post', permission.userId);

	if (permission.granted) {
		try {
			const updatedProductCount = await updateProductList();
			body = { updatedCount: updatedProductCount };
			status = 200;
			createAppLogEntry(AppLogStatus.OK, 'Product update successful', permission.userId);
		} catch (error) {
			body = { error };
			status = 500;
			createAppLogEntry(AppLogStatus.CRITICAL, `Product update error: ${error.toString()}`, permission.userId);
		}
	} else {
		status = 401;
	}

	return {
		status,
		body
	};
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
