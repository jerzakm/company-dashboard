import { ApiPermission, tokenHasPermission } from '../../_authUtil';
import { addProduct, newReturn } from '../_returnEntry';

export async function post(request) {
	let status = 400;
	let body: any = {};

	const permission = await tokenHasPermission(request.headers.authorization, ApiPermission.ADD_NEW_RETURN);

	if (!permission.granted) {
		status = 401;
		return { status, body };
	}

	if (!request.body) {
		return { status, body };
	}

	try {
		console.log(request.body);
		const res = await addProduct(request.body, permission.userId, request.body.returnId);
		body = res;
		status = 200;
	} catch (e) {}

	return {
		status,
		body
	};
}
