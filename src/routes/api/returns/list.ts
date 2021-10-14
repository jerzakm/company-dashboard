import { ApiPermission, tokenHasPermission } from '../_authUtil';
import { getReturn, getReturnsList } from './_list';

export async function get(request) {
	let status = 400;
	let body: any = {};

	const permission = await tokenHasPermission(request.headers.authorization, ApiPermission.GET_RETURN_LIST);

	if (!permission.granted) {
		status = 401;
		return { status, body };
	}

	try {
		const searchParams = request.query;

		// get one return if query ?id=xxxx
		if (searchParams.has('id')) {
			const res = await getReturn(searchParams.get('id'));
			body = res;
			status = 200;
		}
		// get entire list
		else {
			const res = await getReturnsList();
			body = res;
			status = 200;
		}
	} catch (e) {}

	return {
		status,
		body
	};
}
