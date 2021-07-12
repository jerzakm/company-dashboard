import { ApiPermission, tokenHasPermission } from '../_authUtil';
import { newReturn } from './_returnEntry';

export async function post(request) {
	let status = 400;
	let body = {};

	const permission = await tokenHasPermission(request.headers.authorization, ApiPermission.ADD_NEW_RETURN);

	console.log(permission);

	if (!permission.granted) {
		status = 401;
		return { status, body };
	}

	if (!request.body) {
		return { status, body };
	}

	try {
		await newReturn(request.body);
		status = 200;
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
