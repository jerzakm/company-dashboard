import { ApiPermission, tokenHasPermission } from '../_authUtil';

import { getReturnReasons, getSaleSources } from './_util';

export async function get(request) {
	let status = 400;
	let body: any = {};

	const permission = await tokenHasPermission(request.headers.authorization, ApiPermission.GET_RETURN_LIST);

	if (!permission.granted) {
		status = 401;
		return { status, body };
	}

	try {
		const saleSources = await getSaleSources();
		const returnReasons = await getReturnReasons();
		body = { saleSources, returnReasons };
		status = 200;
	} catch (e) {
		status = 500;
	}

	return {
		status,
		body
	};
}
