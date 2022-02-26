import { ApiPermission } from '$lib/core/auth';
import { tokenHasPermission } from '../../_prisma';
import { addProduct } from './_helpers';

export async function post({ request }) {
	let status = 400;

	const authorization = await request.headers.get('authorization');
	if (!authorization) {
		return {
			status: 401
		};
	}
	const permission = await tokenHasPermission(authorization, ApiPermission.returns.edit);

	if (!permission.granted) {
		status = 401;
		return { status };
	}

	const body = {
		data: {},
		err: {}
	};

	try {
		const { productId, returnId } = await request.json();

		console.log(productId, permission.userId, returnId);

		const addedProduct = await addProduct(productId, permission.userId, returnId);

		body.data = addedProduct;

		status = 200;
	} catch (e) {
		// createAppLogEntry(AppLogStatus.CRITICAL, JSON.stringify(e), permission.userId);
	}

	return {
		status,
		body
	};
}
