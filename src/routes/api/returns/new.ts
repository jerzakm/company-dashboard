import { AppLogStatus, createAppLogEntry } from '../_applicationLog';
import { ApiPermission, tokenHasPermission } from '../_authUtil';
import { prisma } from '../_prisma';

export async function post(request) {
	const permission = await tokenHasPermission(request.headers.authorization, ApiPermission.PRODUCTS_POST);

	console.log(request.body);

	let status = 400;
	let body = {};

	if (!request.body) {
		return { status, body };
	}

	try {
		const { city, country, name, postCode, phone, street } = request.body;
		prisma.returnEntry.create({
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

				resolved: false
			}
		});
	} catch (e) {}

	// createAppLogEntry(AppLogStatus.INFO, 'User requested products update', permission.userId);

	// if (permission.granted) {
	// 	try {
	// 		const updatedProductCount = await updateProductList();
	// 		body = { updatedCount: updatedProductCount };
	// 		status = 200;
	// 		createAppLogEntry(AppLogStatus.OK, 'Product update successful', permission.userId);
	// 	} catch (error) {
	// 		body = { error };
	// 		status = 500;
	// 		createAppLogEntry(AppLogStatus.CRITICAL, `Product update error: ${error.toString()}`, permission.userId);
	// 	}
	// } else {
	// 	status = 401;
	// }

	return {
		status,
		body
	};
}
