import { ApiPermission, tokenHasPermission } from '../_authUtil';
import { newReturn } from './_returnEntry';

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
		const res = await newReturn(request.body, permission.userId);
		console.log(res);
		body = res;
		status = 200;
	} catch (e) {}

	return {
		status,
		body
	};
}
