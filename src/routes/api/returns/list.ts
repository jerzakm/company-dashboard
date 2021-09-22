import { ApiPermission, tokenHasPermission } from '../_authUtil';
import { getReturnsList } from './_list';

export async function get(request) {
	let status = 400;
	let body: any = {};

	const permission = await tokenHasPermission(request.headers.authorization, ApiPermission.GET_RETURN_LIST);

	if (!permission.granted) {
		status = 401;
		return { status, body };
	}

	if (!request.body) {
		return { status, body };
	}

	try {
		const res = await getReturnsList();
		body = res;
		status = 200;
	} catch (e) {}

	return {
		status
	};
}
